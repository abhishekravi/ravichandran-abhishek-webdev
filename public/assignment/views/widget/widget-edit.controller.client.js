/**
 * edit widget controller.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("EditWidgetController", EditWidgetController);

    /**
     * contains edit widget controller methods.
     * @param $location
     * for relocation
     * @param $routeParams
     * to get route params
     * @param WidgetService
     * widget service
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

        /**
         * method to update widget.
         */
        function updateWidget(){
            WidgetService.updateWidget(vm.wgid, vm.widget);
            $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget");
        }

        /**
         * method to delete widget.
         */
        function deleteWidget(){
            WidgetService.deleteWidget(vm.wgid);
            $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget");
        }
    }

})();
    
    