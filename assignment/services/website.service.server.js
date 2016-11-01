module.exports = function (app) {
    var websites  = [
        { "_id": "123", "name": "Facebook",    "developerId": "456" },
        { "_id": "234", "name": "Tweeter",     "developerId": "456" },
        { "_id": "456", "name": "Gizmodo",     "developerId": "456" },
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123" },
        { "_id": "678", "name": "Checkers",    "developerId": "123" },
        { "_id": "789", "name": "Chess",       "developerId": "234" }
    ];

    app.get('/api/website/:wid', findWebsiteById);
    app.get('/api/:uid/website', findAllWebsitesForUser);
    app.post('/api/:uid/website', createWebsite);
    app.put('/api/website/:wid',updateWebsite);
    app.delete('/api/website/:wid',deleteWebsite);

    /**
     * method to get next website id.
     * @returns {number}
     * wensite id
     */
    function getNewId(){
        return parseInt(websites[websites.length - 1]._id) + 1;
    }

    /**
     * method to create new website.
     * @param req
     * request
     * @param res
     * response
     */
    function createWebsite(req, res) {
        var website = req.body;
        website.developerId = req.params.uid;
        website._id = getNewId();
        websites.push(website);
        res.sendStatus(200);
    }



    /**
     * method to find websites by userid.
     * @param req
     * request
     * @param res
     * response
     */
    function findAllWebsitesForUser(req,res) {
        var userId = req.params.uid;
        var i;
        var websiteArr = [];
        for (i = 0; i < websites.length; i++) {
            if (websites[i].developerId == userId) {
                websiteArr.push(websites[i]);
            }
        }
        res.send(websiteArr);
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
        var i;
        var website;
        for (i = 0; i < websites.length; i++) {
            if (websites[i]._id == websiteId) {
                website = websites[i];
                break;
            }
        }
        res.send(website);
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
        var i;
        for (i = 0; i < websites.length; i++) {
            if (websites[i]._id == website._id) {
                websites[i] = website;
                break;
            }
        }
        res.sendStatus(200);
    }

    /**
     * method to delete website.
     * @param req
     * request
     * @param res
     * response
     */
    function deleteWebsite(req, res) {
        var websiteId = req.params.wid;
        var i;
        for (i = 0; i < websites.length; i++) {
            if (websites[i]._id == websiteId) {
                websites.splice(i,1);
                break;
            }
        }
        res.sendStatus(200);
    }
};