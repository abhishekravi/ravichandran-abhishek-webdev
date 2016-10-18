/**
 * page view service.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    /**
     *  contains all page view service methods.
     * @returns {{createPage: createPage, findPageByWebsiteId: findPageByWebsiteId, findPageById: findPageById, updatePage: updatePage, deletePage: deletePage}}
     * @constructor
     */
    function PageService() {
        var pages = [
            {"_id": "321", "name": "Post 1", "websiteId": "456"},
            {"_id": "432", "name": "Post 2", "websiteId": "456"},
            {"_id": "543", "name": "Post 3", "websiteId": "456"}
        ];

        var api = {
            "createPage": createPage,
            "findPageByWebsiteId": findPageByWebsiteId,
            "findPageById": findPageById,
            "updatePage": updatePage,
            "deletePage": deletePage
        };
        return api;

        /**
         * method to create a new page.
         * @param websiteId
         * website id
         * @param page
         * page object
         */
        function createPage(websiteId, page) {
            page.websiteId = websiteId;
            page._id = getNewId();
            pages.push(page);
        }

        /**
         * method to get the next page id.
         * @returns {number}
         * page id
         */
        function getNewId() {
            return parseInt(pages[pages.length - 1]._id) + 1;
        }

        /**
         * method to find all pages in a website.
         * @param websiteId
         * wensite id
         * @returns {Array}
         * array of pages
         */
        function findPageByWebsiteId(websiteId) {
            var i;
            var viewPages = [];
            for (i = 0; i < pages.length; i++) {
                if (pages[i].websiteId == websiteId) {
                    viewPages.push(pages[i]);
                }
            }
            return viewPages;
        }

        /**
         * method to find a page by its id.
         * @param pageId
         * page id
         * @returns {*}
         * page object
         */
        function findPageById(pageId) {
            var i;
            var page;
            for (i = 0; i < pages.length; i++) {
                if (pages[i]._id == pageId) {
                    page = pages[i];
                    break;
                }
            }
            return page;
        }

        /**
         * method to update a page.
         * @param pageId
         * page id
         * @param page
         * updated page object
         */
        function updatePage(pageId, page) {
            var i;
            for (i = 0; i < pages.length; i++) {
                if (pages[i]._id == pageId) {
                    pages[i] = page;
                    break;
                }
            }
        }

        /**
         * method to delete a page.
         * @param pageId
         * page id
         */
        function deletePage(pageId) {
            var i;
            for (i = 0; i < pages.length; i++) {
                if (pages[i]._id == pageId) {
                    pages.splice(i, 1);
                    break;
                }
            }
        }

    }
})();
