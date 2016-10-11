(function () {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController)
        .controller("NewPageController", NewPageController)
        .controller("EditPageController", EditPageController);


    function PageListController($routeParams, PageService) {
        var vm = this;

    }

    function NewPageController($routeParams, PageService) {
        var vm = this;
    }

    function EditPageController($routeProvider, PageService) {
        var vm = this;

    }


})();