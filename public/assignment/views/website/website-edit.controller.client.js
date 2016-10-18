/**
 * website edit controller.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController", EditWebsiteController);

    /**
     * contains edit controller methods.
     * @param $location
     * for redirection
     * @param $routeParams
     * to get route params
     * @param WebsiteService
     * website service
     * @constructor
     */
    function EditWebsiteController($location, $routeParams, WebsiteService) {
        var vm = this;
        vm.websiteId = $routeParams["wid"];
        vm.uid = $routeParams["uid"];
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;
        vm.websites = WebsiteService.findWebsitesByUser(vm.uid);

        /**
         * to initialize website edit page.
         */
        function init() {
            vm.website = WebsiteService.findWebsiteById(vm.websiteId);
        }
        init();

        /**
         * method to update web page.
         * @param website
         * website object
         */
        function updateWebsite(website) {
            WebsiteService.updateWebsite(vm.websiteId, website);
            $location.url("/user/" + vm.uid + "/website");
        }

        /**
         * mehtod to delete website.
         */
        function deleteWebsite() {
            WebsiteService.deleteWebsite(vm.websiteId);
            $location.url("/user/" + vm.uid + "/website");
        }
    }

})();