//user schema
module.exports = function () {
    var mongoose = require("mongoose");
    var UserSchema = mongoose.Schema({
        username: {type: String, required: true},
        password: {type: String, required: true},
        firstName: {type: String},
        lastName: {type: String},
        phone: {type: String},
        email: {type: String},
        websites: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'WebsiteModel'
            }],
        dateCreated: {type: Date, default: Date.now()}
    }, {collection: "user"});
    return UserSchema;
};


