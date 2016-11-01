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
            var ret = WidgetService.findWidgetById(vm.wgid);
            ret
                .success(function (widget) {
                    vm.widget = widget;
                })
                .error(function (e) {
                    
                });
        }
        init();

        /**
         * method to update widget.
         */
        function updateWidget(){
            var ret = WidgetService.updateWidget(vm.wgid, vm.widget);
            ret
                .success(function (s) {
                    $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget");
                })
                .error(function (e) {

                });
        }

        /**
         * method to delete widget.
         */
        function deleteWidget(){
            var ret = WidgetService.deleteWidget(vm.wgid);
            ret
                .success(function (s) {
                    $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget");
                })
                .error(function (e) {

                });
        }
    }

})();
    
    