/**
 * Home controller.
 */
(function () {
    angular
        .module("MyApp")
        .controller("HomeController", HomeController);

    /**
     * contains home controller methods.
     * @param $location
     * for redirection
     * @param SearchService
     * serach service
     * @constructor
     */
    function HomeController($location, SearchService) {
        var vm = this;
        vm.search = search;

        /**
         * method to perform query search
         * @param query
         * query
         * @returns {*|Object|Number}
         * result object
         */
        function search(query) {
            return SearchService.search(query);
        }
    }

})();