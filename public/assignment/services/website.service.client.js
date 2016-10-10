(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);
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
            "createWebsite": "createWebsite",
            "findWebsitesByUser": "findWebsitesByUser",
            "findWebsiteById": "findWebsiteById",
            "updateWebsite": "updateWebsite",
            "deleteWebsite": "deleteWebsite",
        };
        return api;
        //method to create new website
        function createWebsite(userId, website) {
            website.developerId = userId;
            websites.push(website);
        }

        //method to find website by userid
        function findWebsitesByUser(userId) {
            var i;
            var website;
            for (i = 0; i < websites.length; i++) {
                if (websites[i].developerId == userId) {
                    website = websites[i];
                    break;
                }
            }
            return website;
        }

        //method to find website by website id
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

        //method to update website
        function updateWebsite(websiteId, website) {
            var i;
            for (i = 0; i < websites.length; i++) {
                if (websites[i]._id == websiteId) {
                    websites[i] = website;
                    break;
                }
            }
        }

        //method to delete website
        function deleteWebsite(websiteId) {
            var i;
            for (i = 0; i < websites.length; i++) {
                if (websites[i]._id == websiteId) {
                    websites.remove(i);
                    break;
                }
            }
        }

    }
})();
