/**
 * flickr image search service.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("FlickrService", FlickrService);

    /**
     * flickr service to get search for pictures.
     * @param $http
     * @returns {{searchPhotos: searchPhotos}}
     * @constructor
     */
    function FlickrService($http) {

        var key = "739d7f9e6a6e3a3d455a9ed0fce348ae";
        var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

        var api = {
            "searchPhotos": searchPhotos
        };
        return api;

        /**
         * method to place the api call.
         * @param searchTerm
         * search query
         * @returns {*}
         */
        function searchPhotos(searchTerm) {
            var url = urlBase.replace("API_KEY", key).replace("TEXT", searchTerm);
            return $http.get(url);
        }
    }
})();
