(function () {
    angular
        .module("WebAppMaker")
        .controller("NewPageController", NewPageController);

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


})();