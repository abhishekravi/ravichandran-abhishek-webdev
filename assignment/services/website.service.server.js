module.exports = function (app, model) {

    app.get('/api/website/:wid', findWebsiteById);
    app.get('/api/:uid/website', findAllWebsitesForUser);
    app.post('/api/:uid/website', createWebsite);
    app.put('/api/website/:wid', updateWebsite);
    app.delete('/api/website/:wid', deleteWebsite);

    /**
     * method to create new website.
     * @param req
     * request
     * @param res
     * response
     */
    function createWebsite(req, res) {
        var website = req.body;
        model.websiteModel.createWebsiteForUser(req.params.uid, website)
            .then(
                function (userObj) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }


    /**
     * method to find websites by userid.
     * @param req
     * request
     * @param res
     * response
     */
    function findAllWebsitesForUser(req, res) {
        var userId = req.params.uid;
        model.websiteModel.findAllWebsitesForUser(userId)
            .then(
                function (websites) {
                    res.json(websites);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    /**
     * method to find website by website id.
     * @param req
     * request
     * @param res
     * response
     */
    function findWebsiteById(req, res) {
        var websiteId = req.params.wid;
        model.websiteModel.findWebsiteById(websiteId)
            .then(function (website) {
                res.json(website);
            },
            function (error) {
                res.sendStatus(400).send(error);
            });
    }

    /**
     * method to update website.
     * @param req
     * request
     * @param res
     * response
     */
    function updateWebsite(req, res) {
        var website = req.body;
        model.websiteModel.updateWebsite(req.params.wid, website)
            .then(function () {
                res.sendStatus(200);
            },function (error) {
                res.sendStatus(400).send(error);
            });
    }

    /**
     * method to delete website.
     * @param req
     * request
     * @param res
     * response
     */
    function deleteWebsite(req, res) {
        model.websiteModel.deleteWebsite(req.params.wid)
            .then(function () {
                res.sendStatus(200);
            },function (error) {
                res.sendStatus(400).send(error);
            });
    }
};