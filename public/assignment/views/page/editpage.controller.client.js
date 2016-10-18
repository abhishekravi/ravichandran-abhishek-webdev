(function () {
    angular
        .module("WebAppMaker")
        .controller("EditPageController", EditPageController);

    function EditPageController($location, $routeParams, PageService) {
        var vm = this;
        vm.wid = $routeParams["wid"];
        vm.uid = $routeParams["uid"];
        vm.pid = $routeParams["pid"];
        vm.updatePage = updatePage;
        vm.deletePage = deletePage;
        function init() {
            vm.page = PageService.findPageById(vm.pid);
        }
        init();

        function updatePage(page) {
            PageService.updatePage(vm.pid, page);
            $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page");
        }

        function deletePage() {
            PageService.deletePage(vm.pid);
            $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page");
        }

    }


})();