module.exports = function () {
    var model = {};
    var mongoose = require("mongoose");
    var UserSchema = require('./user.schema.server')();
    var UserModel = mongoose.model("UserModel", UserSchema);

    var api = {
        createUser: createUser,
        findUserById: findUserById,
        updateUser: updateUser,
        findUserByCredentials: findUserByCredentials,
        findUserByUsername: findUserByUsername,
        deleteUser: deleteUser,
        setModel: setModel
    };
    return api;

    function setModel(_model){
        model = _model;
    }

    function createUser(user) {
        return UserModel.create(user);
    }

    function findUserById(id) {
        return UserModel.findById(id);
    }

    function updateUser(uid, user) {
        return UserModel.update(
            {_id: uid},
            {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phone: user.phone
            }
        );
    }

    function findUserByCredentials(username, password) {
        return UserModel.findOne(
            {
                username: username,
                password: password
            });
    }

    function findUserByUsername(username) {
        return UserModel.findOne(
            {
                username: username
            }
        );
    }

    function deleteUser(uid) {
        return UserModel.remove(
            {
                _id: uid
            }
        );
    }
};