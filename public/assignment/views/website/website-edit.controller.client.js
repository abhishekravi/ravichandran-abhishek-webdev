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
        var ret = WebsiteService.findWebsitesByUser(vm.uid);
        ret.success(function(websites){
            vm.websites = websites;
        })
            .error(function(e){

            });

        /**
         * to initialize website edit page.
         */
        function init() {
            var ret = WebsiteService.findWebsiteById(vm.websiteId);
            ret
                .success(function(website){
                    vm.website = website;
                })
                .error(function (e) {
                    
                });
        }
        init();

        /**
         * method to update web page.
         * @param website
         * website object
         */
        function updateWebsite(website) {
            var ret = WebsiteService.updateWebsite(vm.websiteId, website);
            ret
                .success(function(s){
                    $location.url("/user/" + vm.uid + "/website");
                })
                .error(function (e) {

                });
        }

        /**
         * mehtod to delete website.
         */
        function deleteWebsite() {
            var ret = WebsiteService.deleteWebsite(vm.websiteId);
            ret
                .success(function(s){
                    $location.url("/user/" + vm.uid + "/website");
                })
                .error(function (e) {

                });
        }
    }

})();