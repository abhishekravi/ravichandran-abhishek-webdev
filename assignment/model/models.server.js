module.exports = function () {

    //var connectionString = 'mongodb://webdev:webdev@ds033036.mlab.com:33036/heroku_n8lqdsvf';
    /*var connectionString = 'mongodb://127.0.0.1:27017/webdev';
    if (process.env.MONGODB_URI2) {
        connectionString = process.env.MONGODB_URI2;
    }

    var mongoose = require("mongoose");
    mongoose.createConnection(connectionString);*/

    var userModel = require("./user/user.model.server.js")();
    var websiteModel = require("./website/website.model.server.js")();
    var pageModel = require("./page/page.model.server.js")();
    var widgetModel = require("./widget/widget.model.server.js")();

    //master model object.
    var model =
    {
        userModel: userModel,
        websiteModel: websiteModel,
        pageModel : pageModel,
        widgetModel : widgetModel
    };
    userModel.setModel(model);
    websiteModel.setModel(model);
    pageModel.setModel(model);
    widgetModel.setModel(model);

    return model;
};
