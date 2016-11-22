module.exports = function () {
    var model = {};
    var mongoose = require("mongoose");
    var WebsiteSchema = require('./website.schema.server')();
    var WebsiteModel = mongoose.model("WebsiteModel", WebsiteSchema);

    var api = {
        createWebsiteForUser: createWebsiteForUser,
        findAllWebsitesForUser: findAllWebsitesForUser,
        findWebsiteById: findWebsiteById,
        updateWebsite: updateWebsite,
        deleteWebsite: deleteWebsite,
        setModel: setModel
    };
    return api;

    function setModel(_model){
        model = _model;
    }

    function createWebsiteForUser(userId, website) {
        return WebsiteModel.create(website)
            .then(function (webObj) {
                model.userModel.findUserById(userId)
                    .then(function (userObj) {
                        userObj.websites.push(webObj);
                        webObj._user = userObj._id;
                        webObj.save();
                        return userObj.save();
                    },function (error) {
                        console.log(error);
                    });
            });
    }

    function findAllWebsitesForUser(userId) {
        return WebsiteModel.find(
            {_user : userId}
        );
    }

    function findWebsiteById(wid) {
        return WebsiteModel.findById(wid);
    }

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

    function deleteWebsite(wid) {
        return findWebsiteById(wid)
            .then(function (website) {
                model.userModel.findUserById(website._user)
                    .then(function (user) {
                        user.websites.pull(wid);
                        user.save();
                        return WebsiteModel.remove(
                            {
                                _id: wid
                            }
                        );
                    })
            });
    }
};