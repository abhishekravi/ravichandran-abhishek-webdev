/**
 * website list controller.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController);

    /**
     * contains website list controller methods.
     * @param $routeParams
     * route params
     * @param WebsiteService
     * website service
     * @constructor
     */
    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;
        userId = $routeParams["uid"];
        vm.uid = userId;

        /**
         * method to populate website list page.
         */
        function init() {
            var ret = WebsiteService.findWebsitesByUser(userId);
            ret.success(function(websites){
                vm.websites = websites;
            }).error(function (e) {
                console.log(e);
            });
        }

        init();
    }

})();