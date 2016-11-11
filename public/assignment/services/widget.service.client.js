/**
 * widget view service.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    /**
     * contains all widget view service methods.
     * @returns {{createWidget: createWidget, findWidgetsByPageId: findWidgetsByPageId, findWidgetById: findWidgetById, updateWidget: updateWidget, deleteWidget: deleteWidget}}
     * @constructor
     */
    function WidgetService($http) {

        var api = {
            "createWidget": createWidget,
            "findWidgetsByPageId": findWidgetsByPageId,
            "findWidgetById": findWidgetById,
            "updateWidget": updateWidget,
            "deleteWidget": deleteWidget,
            "updateImage": updateImage,
            "sort": sort
        };
        return api;

        /**
         * method to create new widget.
         * @param pageId
         * page id
         * @param widget
         * widget object
         * @returns {*}
         * widget object
         */
        function createWidget(pageId, widget) {
            var url = '/api/page/' + pageId + '/widget';
            return $http.post(url, widget);
        }

        /**
         * method to get new widget id.
         * @returns {number}
         * widget id
         */
        function getNewId() {
            return parseInt(widgets[widgets.length - 1]._id) + 1;
        }

        /**
         * method to find widgets by page id.
         * @param pageId
         * page id
         * @returns {Array}
         * array of widgets
         */
        function findWidgetsByPageId(pageId) {
            var url = '/api/page/' + pageId + '/widget';
            return $http.get(url);
        }

        /**
         * method to find widget by widget id.
         * @param widgetId
         * widget id
         * @returns {*}
         * widget object
         */
        function findWidgetById(widgetId) {
            var url = '/api/widget/' + widgetId;
            return $http.get(url);
        }

        /**
         * method to update widget.
         * @param widgetId
         * widget id
         * @param widget
         * widget object
         */
        function updateWidget(widgetId, widget) {
            var url = '/api/widget/' + widgetId;
            return $http.put(url, widget);
        }

        /**
         * method to update flickr image url.
         * @param widgetId
         * widget id
         * @param imageUrl
         * image url
         * @returns {*}
         */
        function updateImage(widgetId, imageUrl) {
            var url = '/api/widget/' + widgetId;
            return $http.put(url, {url:imageUrl});
        }

        /**
         * method to delete widget.
         * @param widgetId
         * widget id
         */
        function deleteWidget(widgetId) {
            var url = '/api/widget/' + widgetId;
            return $http.delete(url);
        }

        /**
         * method to update the positions of widgets.
         * @param pid
         * page id
         * @param start
         * start index
         * @param end
         * changed index
         * @returns {*}
         */
        function sort(pid, start, end) {
            var url = '/api/page/' + pid + '/widget?start=' + start + '&end=' + end;
            return $http.put(url);
        }

    }
})();
