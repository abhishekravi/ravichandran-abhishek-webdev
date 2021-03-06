//widget schema.
module.exports = function () {
    var mongoose = require("mongoose");
    var WidgetSchema = mongoose.Schema({
        _page: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'PageModel'
        },
        type: {
                type: String,
                enum: ['HEADER', 'IMAGE', 'YOUTUBE', 'HTML', 'INPUT', 'TEXT']
            },
        name: {type: String},
        text: {type: String},
        placeholder: {type: String},
        description: {type: String},
        url: {type: String},
        width: {type: String},
        height: {type: String},
        rows: {type: Number},
        size: {type: Number},
        pos: {type: Number},
        class: {type: String},
        icon: {type: String},
        deletable: {type: Boolean},
        formatted: {type: Boolean},
        dateCreated: {type: Date, default: Date.now()}
    }, {collection: "widget"});
    return WidgetSchema;
};