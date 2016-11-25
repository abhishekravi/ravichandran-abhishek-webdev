module.exports = function () {
    var model = {};
    var mongoose = require("mongoose");
    var WidgetSchema = require('./widget.schema.server')();
    var WidgetModel = mongoose.model("WidgetModel", WidgetSchema);

    //widget model apis.
    var api = {
        createWidget: createWidget,
        findAllWidgetsForPage: findAllWidgetsForPage,
        findWidgetById: findWidgetById,
        updateWidget: updateWidget,
        updateImageURL: updateImageURL,
        deleteWidget: deleteWidget,
        reorderWidget: reorderWidget,
        setModel: setModel,
        cleanup: cleanup
    };
    return api;

    /**
     * set master model.
     * @param _model
     */
    function setModel(_model) {
        model = _model;
    }

    /**
     * method to create a widget.
     * @param pid
     * page id
     * @param widget
     * widget object
     * @returns {*|Promise}
     */
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

    /**
     * find all widgets for a page.
     * @param pid
     * page id
     * @returns {Query|*|{}}
     */
    function findAllWidgetsForPage(pid) {
        return WidgetModel.find(
            {_page: pid}
        );
    }

    /**
     * find widget by widget id.
     * @param wgid
     * widget id
     * @returns {*}
     */
    function findWidgetById(wgid) {
        return WidgetModel.findById(wgid);
    }

    /**
     * to update the image url of a image widget.
     * @param wgid
     * widget id
     * @param url
     * image url
     * @returns {Query|*}
     */
    function updateImageURL(wgid, url) {
        return WidgetModel.update(
            {_id: wgid},
            {
                url: url
            });
    }

    /**
     * update a widget.
     * @param wgid
     * widget id
     * @param widget
     * widget object
     * @returns {Query|*}
     */
    function updateWidget(wgid, widget) {
        switch (widget.type) {
            case 'HTML':
                return WidgetModel.update(
                    {_id: wgid},
                    {
                        name: widget.name,
                        text: widget.text
                    });
                break;
            case 'TEXT':
                return WidgetModel.update(
                    {_id: wgid},
                    {
                        name: widget.name,
                        text: widget.text,
                        placeholder: widget.placeholder,
                        rows: widget.rows,
                        class: widget.class,
                        formatted: widget.formatted
                    });
                break;
            case 'HEADER':
                return WidgetModel.update(
                    {_id: wgid},
                    {
                        name: widget.name,
                        text: widget.text,
                        size: widget.size
                    });
                break;
            case 'IMAGE':
                return WidgetModel.update(
                    {_id: wgid},
                    {
                        name: widget.name,
                        text: widget.text,
                        url: widget.url,
                        width: widget.width,
                        height: widget.height
                    });
                break;
            case 'YOUTUBE':
                return WidgetModel.update(
                    {_id: wgid},
                    {
                        name: widget.name,
                        text: widget.text,
                        url: widget.url,
                        width: widget.width
                    });
                break;
        }
    }

    /**
     * method to delete a widget.
     * @param wgid
     * widget id
     * @returns {*|Promise}
     */
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
                    //move all widgets below on position up.
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

    /**
     * method to store widget reorder positions.
     * @param pid
     * page id
     * @param start
     * initial position of widget
     * @param end
     * final position of widget
     * @returns {Promise}
     */
    function reorderWidget(pid, start, end) {
        //if widget is moved from top to bottom
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
        }
        //if widget is moved from bottom to top
        else {
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

    /**
     * remove all widgets for a page.
     * @param pid
     * page id
     * @returns {Promise}
     */
    function cleanup(pid){
        return WidgetModel.remove({_page : pid});
    }
};