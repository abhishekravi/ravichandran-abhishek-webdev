/**
 * page edit controller.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("EditPageController", EditPageController);

    /**
     * page edit controller methods.
     * @param $location
     * for redirection
     * @param $routeParams
     * to get params in url
     * @param PageService
     * page service
     * @constructor
     */
    function EditPageController($location, $routeParams, PageService) {
        var vm = this;
        vm.wid = $routeParams["wid"];
        vm.uid = $routeParams["uid"];
        vm.pid = $routeParams["pid"];
        vm.updatePage = updatePage;
        vm.deletePage = deletePage;

        /**
         * method to initialize page with data.
         */
        function init() {
            vm.page = PageService.findPageById(vm.pid);
        }
        init();

        /**
         * method to update page.
         * @param page
         * page object
         */
        function updatePage(page) {
            PageService.updatePage(vm.pid, page);
            $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page");
        }

        /**
         * method to delete the page.
         */
        function deletePage() {
            PageService.deletePage(vm.pid);
            $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page");
        }

    }


})();