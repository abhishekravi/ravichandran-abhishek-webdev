module.exports = function () {
    var model = {};
    var mongoose = require("mongoose");
    var WidgetSchema = require('./widget.schema.server')();
    var WidgetModel = mongoose.model("WidgetModel", WidgetSchema);

    var api = {
        createWidget: createWidget,
        findAllWidgetsForPage: findAllWidgetsForPage,
        findWidgetById: findWidgetById,
        updateWidget: updateWidget,
        updateImageURL: updateImageURL,
        deleteWidget: deleteWidget,
        reorderWidget: reorderWidget,
        setModel: setModel
    };
    return api;

    function setModel(_model) {
        model = _model;
    }

    function createWidget(pid, widget) {
        return WidgetModel.create(widget)
            .then(function (widgetObj) {
                model.pageModel.findPageById(pid)
                    .then(function (pageObj) {
                        pageObj.widgets.push(widgetObj);
                        widgetObj._page = pageObj._id;
                        widgetObj.save();
                        pageObj.save();
                    }, function (error) {
                        console.log(error);
                    });
            }, function (error) {
                console.log(error);
            });
    }

    function findAllWidgetsForPage(pid) {
        return WidgetModel.find(
            {_page: pid}
        );
    }

    function findWidgetById(wgid) {
        return WidgetModel.findById(wgid);
    }

    function updateImageURL(wgid, url) {
        return WidgetModel.update(
            {_id: wgid},
            {
                url: url
            });
    }

    function updateWidget(wgid, widget) {
        switch (widget.type) {
            case 'HTML':
                return WidgetModel.update(
                    {_id: wgid},
                    {
                        name: widget.name,
                        text: widget.text,
                        description: widget.description,
                        width: widget.width,
                        height: widget.height,
                        rows: widget.rows,
                        class: widget.class,
                        icon: widget.icon,
                        formatted: widget.formatted
                    });
                break;
            case 'TEXT':
                return WidgetModel.update(
                    {_id: wgid},
                    {
                        name: widget.name,
                        text: widget.text,
                        placeholder: widget.placeholder,
                        description: widget.description,
                        width: widget.width,
                        height: widget.height,
                        rows: widget.rows,
                        class: widget.class,
                        icon: widget.icon,
                        formatted: widget.formatted
                    });
                break;
            case 'HEADER':
                return WidgetModel.update(
                    {_id: wgid},
                    {
                        name: widget.name,
                        text: widget.text,
                        placeholder: widget.placeholder,
                        description: widget.description,
                        rows: widget.rows,
                        size: widget.size,
                        class: widget.class,
                        icon: widget.icon,
                        formatted: widget.formatted
                    });
                break;
            case 'IMAGE':
                return WidgetModel.update(
                    {_id: wgid},
                    {
                        name: widget.name,
                        text: widget.text,
                        placeholder: widget.placeholder,
                        description: widget.description,
                        url: widget.url,
                        width: widget.width,
                        height: widget.height,
                        rows: widget.rows,
                        class: widget.class,
                        icon: widget.icon,
                        formatted: widget.formatted
                    });
                break;
            case 'YOUTUBE':
                return WidgetModel.update(
                    {_id: wgid},
                    {
                        name: widget.name,
                        text: widget.text,
                        placeholder: widget.placeholder,
                        description: widget.description,
                        url: widget.url,
                        width: widget.width,
                        height: widget.height,
                        rows: widget.rows,
                        class: widget.class,
                        icon: widget.icon,
                        formatted: widget.formatted
                    });
                break;
            case 'INPUT':
                return WidgetModel.update(
                    {_id: wgid},
                    {
                        name: widget.name,
                        text: widget.text,
                        placeholder: widget.placeholder,
                        description: widget.description,
                        width: widget.width,
                        height: widget.height,
                        rows: widget.rows,
                        size: widget.size,
                        class: widget.class,
                        icon: widget.icon,
                        formatted: widget.formatted
                    });
                break;
        }
    }

    function deleteWidget(wgid) {
        return WidgetModel.findById(wgid)
            .then(function (widget) {
                WidgetModel.find(
                    {
                        pos: {$gt:widget.pos}
                    }
                ).then(function (widgets) {
                    if (widgets.length == 0)
                    {
                        return WidgetModel.remove(
                            {
                                _id: wgid
                            }
                        );
                    }
                    widgets.sort(function (a, b) {
                        return a.pos - b.pos;
                    });
                    for (var i = 0; i < widgets.length; i++) {
                        widgets[i].pos = widgets[i].pos - 1;
                        widgets[i].save();
                    }
                    return WidgetModel.remove(
                        {
                            _id: wgid
                        }
                    );
                })
            });

    }

    function reorderWidget(pid, start, end) {
        if (end > start) {
            return WidgetModel.find(
                {
                    _page: pid,
                    pos: {$gt: (start - 1), $lt: (end + 1)}
                }
            ).then(function (widgets) {
                if (widgets.length == 1)
                    return;
                widgets.sort(function (a, b) {
                    return a.pos - b.pos;
                });
                widgets[0].pos = end;
                widgets[0].save();
                for (var i = 1; i < widgets.length; i++) {
                    widgets[i].pos = widgets[i].pos - 1;
                    widgets[i].save();
                }

            });
        } else {
            return WidgetModel.find(
                {
                    _page: pid,
                    pos: {$gt: (end - 1), $lt: (start + 1)}
                }
            ).then(function (widgets) {
                if (widgets.length == 1)
                    return;
                widgets.sort(function (a, b) {
                    return a.pos - b.pos;
                });
                widgets[widgets.length - 1].pos = end;
                widgets[widgets.length - 1].save();
                for (var i = 0; i < widgets.length - 1; i++) {
                    widgets[i].pos = widgets[i].pos + 1;
                    widgets[i].save();
                }

            });
        }

    }
};