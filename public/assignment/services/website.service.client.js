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
    function WebsiteService() {
        var websites  = [
            { "_id": "123", "name": "Facebook",    "developerId": "456" },
            { "_id": "234", "name": "Tweeter",     "developerId": "456" },
            { "_id": "456", "name": "Gizmodo",     "developerId": "456" },
            { "_id": "567", "name": "Tic Tac Toe", "developerId": "123" },
            { "_id": "678", "name": "Checkers",    "developerId": "123" },
            { "_id": "789", "name": "Chess",       "developerId": "234" }
        ];

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
            website.developerId = userId;
            website._id = getNewId();
            websites.push(website);
        }

        /**
         * method to get next website id.
         * @returns {number}
         * wensite id
         */
        function getNewId(){
            return parseInt(websites[websites.length - 1]._id) + 1;
        }

        /**
         * method to find websites by userid.
         * @param userId
         * user id
         * @returns {Array}
         * array of websites
         */
        function findWebsitesByUser(userId) {
            var i;
            var websiteArr = [];
            for (i = 0; i < websites.length; i++) {
                if (websites[i].developerId == userId) {
                    websiteArr.push(websites[i]);
                }
            }
            return websiteArr;
        }

        /**
         * method to find website by website id.
         * @param websiteId
         * website id
         * @returns {*}
         * website object
         */
        function findWebsiteById(websiteId) {
            var i;
            var website;
            for (i = 0; i < websites.length; i++) {
                if (websites[i]._id == websiteId) {
                    website = websites[i];
                    break;
                }
            }
            return website;
        }

        /**
         * method to update website.
         * @param websiteId
         * website id
         * @param website
         * website object
         */
        function updateWebsite(websiteId, website) {
            var i;
            for (i = 0; i < websites.length; i++) {
                if (websites[i]._id == websiteId) {
                    websites[i] = website;
                    break;
                }
            }
        }

        /**
         * method to delete website.
         * @param websiteId
         * website id
         */
        function deleteWebsite(websiteId) {
            var i;
            for (i = 0; i < websites.length; i++) {
                if (websites[i]._id == websiteId) {
                    websites.splice(i,1);
                    break;
                }
            }
        }

    }
})();
