(function () {
    angular
        .module("WebAppMaker")
        .controller("NewWebsiteController", NewWebsiteController);

    function NewWebsiteController($location, $routeParams, WebsiteService) {
        var vm = this;
        vm.uid = $routeParams["uid"];
        vm.createWebsite = createWebsite;
        vm.websites = WebsiteService.findWebsitesByUser(vm.uid);
        function createWebsite(website) {
            WebsiteService.createWebsite(vm.uid, website);
            $location.url("/user/" + vm.uid + "/website");
        }
    }

})();