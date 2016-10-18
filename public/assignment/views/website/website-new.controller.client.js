/**
 * new website controller.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("NewWebsiteController", NewWebsiteController);

    /**
     * contains new website controller methods.
     * @param $location
     * for redirection
     * @param $routeParams
     * to get route params
     * @param WebsiteService
     * website serivce
     * @constructor
     */
    function NewWebsiteController($location, $routeParams, WebsiteService) {
        var vm = this;
        vm.uid = $routeParams["uid"];
        vm.createWebsite = createWebsite;
        vm.websites = WebsiteService.findWebsitesByUser(vm.uid);

        /**
         * method to create new web site.
         * @param website
         * website object
         */
        function createWebsite(website) {
            WebsiteService.createWebsite(vm.uid, website);
            $location.url("/user/" + vm.uid + "/website");
        }
    }

})();