(function () {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController)
        .controller("NewPageController", NewPageController)
        .controller("EditPageController", EditPageController);


    function PageListController($routeParams, PageService) {
        var vm = this;
        vm.wid = $routeParams["wid"];
        vm.uid = $routeParams["uid"];
        vm.pages = PageService.findPageByWebsiteId(vm.wid);
    }

    function NewPageController($location, $routeParams, PageService) {
        var vm = this;
        vm.wid = $routeParams["wid"];
        vm.uid = $routeParams["uid"];
        vm.createNewPage = createNewPage;

        function createNewPage(page){
            PageService.createPage(vm.wid, page);
            $location.url("/user/"+ vm.uid + "/website/" + vm.wid + "/page");
        }
    }

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