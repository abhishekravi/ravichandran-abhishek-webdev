/**
 * search service.
 */
(function () {
    angular
        .module("MyApp")
        .factory("SearchService", SearchService);


    function SearchService() {
        var result = [
            {_id: "123", city: "Boston", lat: "42.339224", long: "-71.087465", place: "Northeastern"}
        ];
        var api = {
            "searchQuery": searchQuery
        };
        return api;

        /**
         * creates new user.
         * @param user
         * user object
         * @returns {*}
         * user object
         */
        function searchQuery(query) {
            return result;
        }
    }
})();
