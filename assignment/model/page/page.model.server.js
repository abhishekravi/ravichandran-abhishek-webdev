module.exports = function () {
    var model = {};
    var mongoose = require("mongoose");
    var PageSchema = require('./page.schema.server')();
    var PageModel = mongoose.model("PageModel", PageSchema);

    var api = {
        createPage: createPage,
        findAllPagesForWebsite: findAllPagesForWebsite,
        findPageById: findPageById,
        updatePage: updatePage,
        deletePage: deletePage,
        setModel: setModel
    };
    return api;

    function setModel(_model){
        model = _model;
    }

    function createPage(wid, page) {
        return PageModel.create(page)
            .then(function (pageObj) {
                model.websiteModel.findWebsiteById(wid)
                    .then(function (websiteObj) {
                        websiteObj.pages.push(pageObj);
                        pageObj._website = websiteObj._id;
                        websiteObj.save();
                        return pageObj.save();
                    },function (error) {
                        console.log(error);
                    });
            });
    }

    function findAllPagesForWebsite(wid) {
        return PageModel.find(
            {_website : wid}
        );
    }

    function findPageById(pid) {
        return PageModel.findById(pid);
    }

    function updatePage(pid, page) {
        return PageModel.update(
            {_id: pid},
            {
                name: page.name,
                title: page.title,
                description: page.description,
                widgets: page.widgets
            }
        );
    }

    function deletePage(pid) {
        return findPageById(pid)
            .then(function (page) {
                model.websiteModel.findWebsiteById(page._website)
                    .then(function (website) {
                        website.pages.pull(pid);
                        website.save();
                        return PageModel.remove(
                            {
                                _id: pid
                            }
                        );
                    })
            });
    }
};