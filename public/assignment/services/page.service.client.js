(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);
    function PageService() {
        var pages   = [
            { "_id": "321", "name": "Post 1", "websiteId": "456" },
            { "_id": "432", "name": "Post 2", "websiteId": "456" },
            { "_id": "543", "name": "Post 3", "websiteId": "456" }
        ];

        var api = {
            "createPage": createPage,
            "findPageByWebsiteId": findPageByWebsiteId,
            "findPageById": findPageById,
            "updatePage": updatePage,
            "deletePage": deletePage
        };
        return api;
        //method to create new page
        function createPage(websiteId, page) {
            page.websiteId = websiteId;
            pages.push(page);
        }

        //method to find page by website id
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

        //method to find page by page id
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

        //method to update page
        function updatePage(pageId, page) {
            var i;
            for (i = 0; i < pages.length; i++) {
                if (pages[i]._id == pageId) {
                    pages[i] = page;
                    break;
                }
            }
        }

        //method to delete page
        function deletePage(pageId) {
            var i;
            for (i = 0; i < pages.length; i++) {
                if (pages[i]._id == pageId) {
                    pages.splice(i,1);
                    break;
                }
            }
        }

    }
})();
