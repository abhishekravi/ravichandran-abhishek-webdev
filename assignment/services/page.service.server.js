module.exports = function (app) {
    var pages = [
        {"_id": "321", "name": "Post 1", "websiteId": "456"},
        {"_id": "432", "name": "Post 2", "websiteId": "456"},
        {"_id": "543", "name": "Post 3", "websiteId": "456"}
    ];

    app.get('/api/page/:pid', findPageById);
    app.get('/api/website/:wid/page', findAllPagesForWebsite);
    app.post('/api/website/:wid/page', createPage);
    app.put('/api/page/:pid',updatePage);
    app.delete('/api/page/:pid',deletePage);

    /**
     * method to create a new page.
     * @param req
     * request
     * @param res
     * response
     */
    function createPage(req, res) {
        var page = req.body;
        page.websiteId = req.params.wid;
        page._id = getNewId();
        pages.push(page);
        res.sendStatus(200);
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
     * @param req
     * request
     * @param res
     * response
     */
    function findAllPagesForWebsite(req, res) {
        var websiteId = req.params.wid;
        var i;
        var viewPages = [];
        for (i = 0; i < pages.length; i++) {
            if (pages[i].websiteId == websiteId) {
                viewPages.push(pages[i]);
            }
        }
        res.send(viewPages);
    }

    /**
     * method to find a page by its id.
     * @param req
     * request
     * @param res
     * response
     */
    function findPageById(req, res) {
        var pageId = req.params.pid;
        var i;
        var page;
        for (i = 0; i < pages.length; i++) {
            if (pages[i]._id == pageId) {
                page = pages[i];
                break;
            }
        }
        res.send(page);
    }

    /**
     * method to update a page.
     * @param req
     * request
     * @param res
     * response
     */
    function updatePage(req, res) {
        var page = req.body;
        var i;
        for (i = 0; i < pages.length; i++) {
            if (pages[i]._id == page._id) {
                pages[i] = page;
                break;
            }
        }
        res.sendStatus(200);
    }

    /**
     * method to delete a page.
     * @param req
     * request
     * @param res
     * response
     */
    function deletePage(req, res) {
        var pageId = req.params.pid;
        var i;
        for (i = 0; i < pages.length; i++) {
            if (pages[i]._id == pageId) {
                pages.splice(i, 1);
                break;
            }
        }
        res.sendStatus(200);
    }
};