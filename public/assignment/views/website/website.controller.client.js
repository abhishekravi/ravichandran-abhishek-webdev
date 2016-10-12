(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController)
        .controller("NewWebsiteController", NewWebsiteController)
        .controller("EditWebsiteController", EditWebsiteController);


    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;
        userId = $routeParams["uid"];
        vm.uid = userId;
        function init() {
            vm.websites = WebsiteService.findWebsitesByUser(userId);
        }

        init();
    }

    function NewWebsiteController($routeParams, WebsiteService) {
        var vm = this;
        vm.uid = $routeParams["uid"];
    }

    function EditWebsiteController($routeProvider, WebsiteService) {
        var vm = this;
        vm.websiteId = $routeProvider.websiteId;
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;

        function updateWebsite(website) {
            WebsiteService.updateWebsite(vm.websiteId, website);
        }

        function deleteWebsite() {
            WebsiteService.deleteWebsite(vm.websiteId);
        }
    }


})();