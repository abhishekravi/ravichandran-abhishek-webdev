module.exports = function (app, model) {
    app.get('/api/user', findUser);
    app.get('/api/user/:uid', findUserById);
    app.post('/api/user', createUser);
    app.put('/api/user/:uid', updateUser);
    app.delete('/api/user/:uid', deleteUser);


    /**
     * method to find user.
     * @param req
     * request
     * @param res
     * response
     */
    function findUser(req, res) {
        var query = req.query;
        if (query.password && query.username) {
            findUserByCredentials(req, res);
        } else if (query.username) {
            findUserByUsername(req, res);
        }
    }

    /**
     * method to find user by username and password.
     * @param req
     * request
     * @param res
     * response
     * @returns {*}
     * user object
     */
    function findUserByCredentials(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        model.userModel.findUserByCredentials(username, password)
            .then(
                function (user) {
                    if (user) {
                        res.json(user);
                    } else {
                        res.send('0');
                    }
                },
                function (error) {
                    res.sendStatus(400).send(error);
                });
    }

    /**
     * method to find user by username.
     * @param req
     * request
     * @param res
     * response
     * @returns {*}
     * user object
     */
    function findUserByUsername(req, res) {
        var username = req.query.username;
        model.userModel.findUserByUsername(username)
            .then(
                function (user) {
                    if (user) {
                        res.send(user);
                    } else {
                        res.send('0');
                    }
                },
                function (error) {
                    res.sendStatus(400).send(error);
                });
    }

    /**
     * method to find user by userid.
     * @param req
     * request
     * @param res
     * response
     * @returns {*}
     * user object
     */
    function findUserById(req, res) {
        var id = req.params.uid;
        model.userModel.findUserById(id)
            .then(
                function (user) {
                    if (user) {
                        res.send(user);
                    } else {
                        res.send('0');
                    }
                },
                function (error) {
                    res.sendStatus(400).send(error);
                });
    }

    /**
     * creates new user.
     * @param req
     * request
     * @param res
     * response
     * @returns {*}
     * user object
     */
    function createUser(req, res) {
        var user = req.body;
        model.userModel.createUser(user)
            .then(
                function (userObj) {
                    res.send(userObj);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    /**
     * method to update user.
     * @param req
     * request
     * @param res
     * response
     */
    function updateUser(req, res) {
        var user = req.body;
        var uid = req.params.uid;
        model.userModel.updateUser(uid, user)
            .then(
                function (s) {
                    res.sendStatus(200);
                },
                function (e) {
                    res.sendStatus(400).send(e);
                });
    }

    /**
     * method to delete user.
     * @param req
     * request
     * @param res
     * response
     */
    function deleteUser(req, res) {
        var uid = req.params.uid;
        model.userModel.deleteUser(uid)
            .then(
                function (s) {
                    res.sendStatus(200);
                },
                function (e) {
                    res.sendStatus(400).send(e);
                });
    }
};