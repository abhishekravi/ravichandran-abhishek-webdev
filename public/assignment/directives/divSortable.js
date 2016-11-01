(function () {
    angular.module('divSortable', [])
        .directive("divSortable", divSortable);

    function divSortable() {
        return {
            link: function (scope, element, attrs) {
                element.sortable();
            }
        }
    }
});