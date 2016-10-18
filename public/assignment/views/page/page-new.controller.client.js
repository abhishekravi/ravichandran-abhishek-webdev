/**
 * page new controller.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("NewPageController", NewPageController);

    /**
     * page new controller methods.
     * @param $location
     * for redirection
     * @param $routeParams
     * to get params in url
     * @param PageService
     * page service
     * @constructor
     */
    function NewPageController($location, $routeParams, PageService) {
        var vm = this;
        vm.wid = $routeParams["wid"];
        vm.uid = $routeParams["uid"];
        vm.createNewPage = createNewPage;

        /**
         * method to create new page.
         * @param page
         * page object
         */
        function createNewPage(page){
            PageService.createPage(vm.wid, page);
            $location.url("/user/"+ vm.uid + "/website/" + vm.wid + "/page");
        }
    }


})();