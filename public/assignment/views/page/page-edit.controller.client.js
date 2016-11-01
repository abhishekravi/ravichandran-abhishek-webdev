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
            var ret = PageService.findPageById(vm.pid);
            ret
                .success(function (page) {
                    vm.page = page;
                })
                .error(function (e) {
                    
                });
        }
        init();

        /**
         * method to update page.
         * @param page
         * page object
         */
        function updatePage(page) {
            var ret = PageService.updatePage(vm.pid, page);
            ret
                .success(function (s) {
                    $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page");
                })
                .error(function (e) {

                });

        }

        /**
         * method to delete the page.
         */
        function deletePage() {
            var ret = PageService.deletePage(vm.pid);
            ret
                .success(function (s) {
                    $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page");
                })
                .error(function (e) {

                });

        }

    }


})();