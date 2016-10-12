(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);
    function WidgetService() {
        var widgets = [
            { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
            { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "http://lorempixel.com/400/200/"},
            { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
            { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E" },
            { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
        ];

        var api = {
            "createWidget": createWidget,
            "findWidgetsByPageId": findWidgetsByPageId,
            "findWidgetById": findWidgetById,
            "updateWidget": updateWidget,
            "deleteWidget": deleteWidget
        };
        return api;
        //method to create new widget
        function createWidget(pageId, widget) {
            widget.pageId  = pageId;
            widgets.push(widget);
        }

        //method to find widgets by page id
        function findWidgetsByPageId(pageId) {
            var i;
            var allWidget;
            for (i = 0; i < widgets.length; i++) {
                if (widgets[i].pageId == pageId) {
                    allWidget.push(widgets[i]);
                    break;
                }
            }
            return allWidget;
        }

        //method to find widget by widget id
        function findWidgetById(widgetId) {
            var i;
            var widget;
            for (i = 0; i < widgets.length; i++) {
                if (widgets[i]._id == widgetId) {
                    widget = widgets[i];
                    break;
                }
            }
            return widget;
        }

        //method to update widget
        function updateWidget(widgetId, widget) {
            var i;
            for (i = 0; i < widgets.length; i++) {
                if (widgets[i]._id == widgetId) {
                    widgets[i] = widget;
                    break;
                }
            }
        }

        //method to delete widget
        function deleteWidget(widgetId) {
            var i;
            for (i = 0; i < widgets.length; i++) {
                if (widgets[i]._id == widgetId) {
                    widgets.remove(i);
                    break;
                }
            }
        }

    }
})();
