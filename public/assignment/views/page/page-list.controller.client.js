/**
 * page list controller.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController);

    /**
     * page list controller methods.
     * @param $routeParams
     * to get params in url
     * @param PageService
     * page service
     * @constructor
     */
    function PageListController($routeParams, PageService) {
        var vm = this;
        vm.wid = $routeParams["wid"];
        vm.uid = $routeParams["uid"];
        vm.pages = PageService.findPageByWebsiteId(vm.wid);
    }


})();