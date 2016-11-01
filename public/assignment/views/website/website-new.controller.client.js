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
        var ret = WebsiteService.findWebsitesByUser(vm.uid);
        ret.success(function(websites){
            vm.websites = websites;
        })
            .error(function(e){

            });

        /**
         * method to create new web site.
         * @param website
         * website object
         */
        function createWebsite(website) {
            var ret = WebsiteService.createWebsite(vm.uid, website);
            ret.success(function (s) {
                $location.url("/user/" + vm.uid + "/website");
            })
                .error(function (e) {

                });

        }
    }

})();