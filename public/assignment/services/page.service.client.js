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
    function PageService($http) {

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
            var url = '/api/website/' + websiteId + '/page';
            return $http.post(url,page);
        }

        /**
         * method to find all pages in a website.
         * @param websiteId
         * wensite id
         * @returns
         * response
         */
        function findPageByWebsiteId(websiteId) {
            var url = '/api/website/' + websiteId + '/page';
            return $http.get(url);
        }

        /**
         * method to find a page by its id.
         * @param pageId
         * page id
         * @returns
         * response
         */
        function findPageById(pageId) {
            var url = '/api/page/' + pageId;
            return $http.get(url);
        }

        /**
         * method to update a page.
         * @param pageId
         * page id
         * @param page
         * updated page object
         */
        function updatePage(pageId, page) {
            var url = '/api/page/' + pageId;
            return $http.put(url,page);
        }

        /**
         * method to delete a page.
         * @param pageId
         * page id
         */
        function deletePage(pageId) {
            var url = '/api/page/' + pageId;
            return $http.delete(url);
        }

    }
})();
