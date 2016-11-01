(function () {
    angular.module("divSortableDir", [])
        .directive("divSortable", divSortable);

    function divSortable() {
        $(".div-sortable").sortable();
        return{
        }
    }
})();