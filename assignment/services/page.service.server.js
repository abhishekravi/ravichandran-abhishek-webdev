module.exports = function (app, model) {

    app.get('/api/page/:pid', findPageById);
    app.get('/api/website/:wid/page', findAllPagesForWebsite);
    app.post('/api/website/:wid/page', createPage);
    app.put('/api/page/:pid', updatePage);
    app.delete('/api/page/:pid', deletePage);

    /**
     * method to create a new page.
     * @param req
     * request
     * @param res
     * response
     */
    function createPage(req, res) {
        var page = req.body;
        var wid = req.params.wid;
        model.pageModel.createPage(wid, page)
            .then(function (page) {
                res.sendStatus(200);
            }, function (error) {
                res.sendStatus(400).send(error);
            });
    }

    /**
     * method to find all pages in a website.
     * @param req
     * request
     * @param res
     * response
     */
    function findAllPagesForWebsite(req, res) {
        model.pageModel.findAllPagesForWebsite(req.params.wid)
            .then(
                function (pages) {
                    res.json(pages);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                });
    }

    /**
     * method to find a page by its id.
     * @param req
     * request
     * @param res
     * response
     */
    function findPageById(req, res) {
        model.pageModel.findPageById(req.params.pid)
            .then(
                function (page) {
                    res.json(page);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                });
    }

    /**
     * method to update a page.
     * @param req
     * request
     * @param res
     * response
     */
    function updatePage(req, res) {
        model.pageModel.updatePage(req.params.pid, req.body)
            .then(function () {
                res.sendStatus(200);
            },function (error) {
                res.sendStatus(400).send(error);
            });
    }

    /**
     * method to delete a page.
     * @param req
     * request
     * @param res
     * response
     */
    function deletePage(req, res) {
        model.pageModel.deletePage(req.params.pid)
            .then(function () {
                res.sendStatus(200);
            },function (error) {
                res.sendStatus(400).send(error);
            });
    }
};