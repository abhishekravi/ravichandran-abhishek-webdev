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
        var ret = PageService.findPageByWebsiteId(vm.wid);
        ret
            .success(function (pages) {
                vm.pages = pages;
            })
            .error(function (e) {
                console.log(e);
            });
    }


})();