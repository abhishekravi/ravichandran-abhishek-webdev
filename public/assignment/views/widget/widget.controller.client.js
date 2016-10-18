/**
 *
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("NewWidgetController", NewWidgetController)
        .controller("EditWidgetController", EditWidgetController);


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

    /**
     *
     * @param $routeParams
     * @param WidgetService
     * @constructor
     */
    function NewWidgetController($location, $routeParams, WidgetService) {
        var vm = this;
        vm.uid = $routeParams["uid"];
        vm.wid = $routeParams["wid"];
        vm.pid = $routeParams["pid"];
        vm.newWidget = newWidget;
        vm.widget = new Object();

        function newWidget(type){
            switch(type){
                case "html":
                    vm.widget.widgetType = "HTML";
                    vm.widget = WidgetService.createWidget(vm.pid, vm.widget);
                    break;
                case "header":
                    vm.widget.widgetType = "HEADER";
                    vm.widget = WidgetService.createWidget(vm.pid, vm.widget);
                    break;
                case "youtube":
                    vm.widget.widgetType = "YOUTUBE";
                    vm.widget = WidgetService.createWidget(vm.pid, vm.widget);
                    break;
                case "image":
                    vm.widget.widgetType = "IMAGE";
                    vm.widget = WidgetService.createWidget(vm.pid, vm.widget);
                    break;
            }
            $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget/" + vm.widget._id);
        }
    }

    /**
     *
     * @param $routeProvider
     * @param WidgetService
     * @constructor
     */
    function EditWidgetController($location, $routeParams, WidgetService) {
        var vm = this;
        vm.uid = $routeParams["uid"];
        vm.wid = $routeParams["wid"];
        vm.pid = $routeParams["pid"];
        vm.wgid = $routeParams["wgid"];
        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;
        /**
         * method to fetch all widgets before loading.
         */
        function init() {
            vm.widget = WidgetService.findWidgetById(vm.wgid);
        }
        init();

        function updateWidget(){
            WidgetService.updateWidget(vm.wgid, vm.widget);
            $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget");
        }

        function deleteWidget(){
            WidgetService.deleteWidget(vm.wgid);
            $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget");
        }
    }


})();