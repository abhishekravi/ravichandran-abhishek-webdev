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
        deleteWidget: deleteWidget,
        reorderWidget:reorderWidget,
        setModel: setModel
    };
    return api;

    function setModel(_model){
        model = _model;
    }

    function createWidget(pid, widget) {
        return WidgetModel.create(widget);
    }

    function findAllWidgetsForPage(pid) {
        return WidgetModel.find(
            {_page : pid}
        );
    }

    function findWidgetById(wgid) {
        return WidgetModel.findById(wgid);
    }

    function updateWidget(wgid, widget) {
        return WidgetModel.update(
            {_id: wgid},
            {
                name: widget.name,
                title: widget.title,
                description: widget.description,
            }
        );
    }

    function deleteWidget(wgid) {
        return WidgetModel.remove(
            {
                _id: wgid
            }
        );
    }

    function reorderWidget(wgid, widget) {
        return WidgetModel.update(
            {_id: wgid},
            {
                name: widget.name,
                title: widget.title,
                description: widget.description,
            }
        );
    }
};