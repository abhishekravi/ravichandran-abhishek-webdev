module.exports = function () {
    var model = {};
    var mongoose = require("mongoose");
    var WebsiteSchema = require('./website.schema.server')();
    var WebsiteModel = mongoose.model("WebsiteModel", WebsiteSchema);

    //website model apis.
    var api = {
        createWebsiteForUser: createWebsiteForUser,
        findAllWebsitesForUser: findAllWebsitesForUser,
        findWebsiteById: findWebsiteById,
        updateWebsite: updateWebsite,
        deleteWebsite: deleteWebsite,
        setModel: setModel
    };
    return api;

    /**
     * set master model.
     * @param _model
     */
    function setModel(_model) {
        model = _model;
    }

    /**
     * create website for a user.
     * @param userId
     * user id
     * @param website
     * website object
     * @returns {*|Promise}
     */
    function createWebsiteForUser(userId, website) {
        return WebsiteModel.create(website)
            .then(function (webObj) {
                model.userModel.findUserById(userId)
                    .then(function (userObj) {
                        userObj.websites.push(webObj);
                        webObj._user = userObj._id;
                        webObj.save();
                        return userObj.save();
                    }, function (error) {
                        console.log(error);
                    });
            });
    }

    /**
     * find websites for a user.
     * @param userId
     * user id
     * @returns {Query|*|{}}
     */
    function findAllWebsitesForUser(userId) {
        return WebsiteModel.find(
            {_user: userId}
        );
    }

    /**
     * find website by id.
     * @param wid
     * website id
     * @returns {*}
     */
    function findWebsiteById(wid) {
        return WebsiteModel.findById(wid);
    }

    /**
     * update a website.
     * @param wid
     * website id
     * @param website
     * website object
     * @returns {Query|*}
     */
    function updateWebsite(wid, website) {
        return WebsiteModel.update(
            {_id: wid},
            {
                name: website.name,
                description: website.description,
                pages: website.pages
            }
        );
    }

    /**
     * delete a website.
     * @param wid
     * website id
     * @returns {*|Promise}
     */
    function deleteWebsite(wid) {
        return findWebsiteById(wid)
            .then(function (website) {
                model.userModel.findUserById(website._user)
                    .then(function (user) {
                        user.websites.pull(wid);
                        user.save();
                        model.pageModel.findAllPagesForWebsite(website._id)
                            .then(function (pages) {
                                for(p in pages){
                                    model.widgetModel.cleanup(pages[p]._id)
                                        .then(function () {
                                            pages[p].remove();
                                        });
                                }
                                website.remove();
                            });
                    })
            });
    }

};