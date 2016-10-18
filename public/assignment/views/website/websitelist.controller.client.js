(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController);

    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;
        userId = $routeParams["uid"];
        vm.uid = userId;
        function init() {
            vm.websites = WebsiteService.findWebsitesByUser(userId);
        }

        init();
    }

})();