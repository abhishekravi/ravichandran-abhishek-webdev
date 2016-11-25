module.exports = function () {
    var model = {};
    var mongoose = require("mongoose");
    var PageSchema = require('./page.schema.server')();
    var PageModel = mongoose.model("PageModel", PageSchema);
    //page model apis.
    var api = {
        createPage: createPage,
        findAllPagesForWebsite: findAllPagesForWebsite,
        findPageById: findPageById,
        updatePage: updatePage,
        deletePage: deletePage,
        setModel: setModel
    };
    return api;

    /**
     * method to set model.
     * @param _model
     * parent model object
     */
    function setModel(_model){
        model = _model;
    }

    /**
     * method to create page.
     * @param wid
     * website id
     * @param page
     * page object
     * @returns {*|Promise}
     */
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

    /**
     * method to get all pages for a website.
     * @param wid
     * website id
     * @returns {Query|*|{}}
     */
    function findAllPagesForWebsite(wid) {
        return PageModel.find(
            {_website : wid}
        );
    }

    /**
     * to find page by id.
     * @param pid
     * page id
     * @returns {*}
     */
    function findPageById(pid) {
        return PageModel.findById(pid);
    }

    /**
     * to update page.
     * @param pid
     * page id
     * @param page
     * page object
     * @returns {Query|*}
     */
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

    /**
     * method to delete a page.
     * @param pid
     * page id
     * @returns {*|Promise}
     */
    function deletePage(pid) {
        return findPageById(pid)
            .then(function (page) {
                model.websiteModel.findWebsiteById(page._website)
                    .then(function (website) {
                        website.pages.pull(pid);
                        website.save();
                        model.widgetModel.cleanup(pid)
                            .then(function () {
                                page.remove();
                            });
                    })
            });
    }

};