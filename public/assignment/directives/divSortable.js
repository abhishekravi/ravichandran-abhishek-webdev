(function () {
    angular.module("divSortableDir", [])
        .directive("divSortable", divSortable);

    /**
     * directive to make elements having div-sortable attribute.
     * @returns {{link: linker}}
     */
    function divSortable() {
        function linker(scope, element, attrs){
            var start = -1;
            var end = -1;
            element.sortable({
                start : function (event, ui) {
                    start = $(ui.item).index();
                },
                stop : function (event, ui) {
                    end = $(ui.item).index();
                    scope.sortableController.sort(start, end);
                }
            });
        }
        return{
            scope: {},
            link: linker,
            controller : sortableController,
            controllerAs : 'sortableController'
        }
    }

    /**
     * controller to call widget service to sort the widgets.
     * @param $routeParams
     * to get route parameters
     * @param WidgetService
     * widget service
     */
    function sortableController($routeParams, WidgetService){
        var vm = this;
        vm.sort = sort;
        function sort(start, end){
            WidgetService.sort($routeParams["pid"],start, end);
        }
    }
})();