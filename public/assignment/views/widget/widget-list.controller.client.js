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
            vm.widgets = WidgetService.findWidgetsByPageId(vm.pid);
        }
        init();

        function checkHTML(text) {
            return $sce.trustAsHtml(text);
        }

        function checkImage(text) {
            return $sce.trustAsResourceUrl(text);
        }

        function checkYoutube(text) {
            var splitArray = text.split('/');
            var vId = splitArray[splitArray.length - 1];
            return $sce.trustAsResourceUrl("https://www.youtube.com/embed/" + vId);
        }

    }

})();