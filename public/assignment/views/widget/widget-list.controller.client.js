/**
 * widget list controller.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController);

    /**
     * controller for widget list.
     * @param $routeParams
     * this holds all the route parameters
     * @param WidgetService
     * service for all widget data
     * @constructor
     */
    function WidgetListController($routeParams, WidgetService, $sce) {
        var vm = this;
        vm.uid = $routeParams["uid"];
        vm.wid = $routeParams["wid"];
        vm.pid = $routeParams["pid"];
        vm.checkHTML = checkHTML;
        vm.checkImage = checkImage;
        vm.checkYoutube = checkYoutube;

        /**
         * method to fetch all widgets before loading.
         */
        function init() {
            var ret = WidgetService.findWidgetsByPageId(vm.pid);
            ret
                .success(function (widgets) {
                    vm.widgets = widgets;
                })
                .error(function (e) {
                    console.log(e);
                });
        }
        init();

        /**
         * method to check html.
         * @param text
         * html
         * @returns {*}
         */
        function checkHTML(text) {
            return $sce.trustAsHtml(text);
        }

        /**
         * method to check image url.
         * @param text
         * image url
         * @returns {*}
         */
        function checkImage(text) {
            return $sce.trustAsResourceUrl(text);
        }

        /**
         * method to check youtube url.
         * @param text
         * youtube url
         * @returns {*}
         */
        function checkYoutube(text) {
            var splitArray = text.split('/');
            var vId = splitArray[splitArray.length - 1];
            return $sce.trustAsResourceUrl("https://www.youtube.com/embed/" + vId);
        }

    }

})();