/**
 * website view service.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    /**
     * contains all website view service methods.
     * @returns {{createWebsite: createWebsite, findWebsitesByUser: findWebsitesByUser, findWebsiteById: findWebsiteById, updateWebsite: updateWebsite, deleteWebsite: deleteWebsite}}
     * @constructor
     */
    function WebsiteService($http) {

        /**
         * method to get next website id.
         * @returns {number}
         * wensite id
         */
        function getNewId(){
            return parseInt(websites[websites.length - 1]._id) + 1;
        }

        var api = {
            "createWebsite": createWebsite,
            "findWebsitesByUser": findWebsitesByUser,
            "findWebsiteById": findWebsiteById,
            "updateWebsite": updateWebsite,
            "deleteWebsite": deleteWebsite
        };
        return api;

        /**
         * method to create new website.
         * @param userId
         * user id
         * @param website
         * website object
         */
        function createWebsite(userId, website) {
            var url = '/api/'+ userId + '/website';
            return $http.post(url,website);
        }



        /**
         * method to find websites by userid.
         * @param userId
         * user id
         * @returns {Array}
         * array of websites
         */
        function findWebsitesByUser(userId) {
            var url = '/api/'+ userId + '/website';
            return $http.get(url);
        }

        /**
         * method to find website by website id.
         * @param websiteId
         * website id
         * @returns {*}
         * website object
         */
        function findWebsiteById(websiteId) {
            var url = '/api/website/' + websiteId;
            return $http.get(url);
        }

        /**
         * method to update website.
         * @param websiteId
         * website id
         * @param website
         * website object
         */
        function updateWebsite(websiteId, website) {
            var url = '/api/website/' + websiteId;
            return $http.put(url,website);
        }

        /**
         * method to delete website.
         * @param websiteId
         * website id
         */
        function deleteWebsite(websiteId) {
            var url = '/api/website/' + websiteId;
            return $http.delete(url);
        }

    }
})();
