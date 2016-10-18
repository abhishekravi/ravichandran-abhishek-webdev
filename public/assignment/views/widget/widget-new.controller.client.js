/**
 * new widget controller.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("NewWidgetController", NewWidgetController);

    /**
     * contains new widget contoller methods.
     * @param $location
     * for redirection
     * @param $routeParams
     * to get route params
     * @param WidgetService
     * widget service
     * @constructor
     */
    function NewWidgetController($location, $routeParams, WidgetService) {
        var vm = this;
        vm.uid = $routeParams["uid"];
        vm.wid = $routeParams["wid"];
        vm.pid = $routeParams["pid"];
        vm.newWidget = newWidget;
        vm.widget = new Object();

        /**
         * method to create new widget.
         * @param type
         * widget type
         */
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

})();