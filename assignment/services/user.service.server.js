module.exports = function (app) {
    var users = [
        {_id: 123, username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
        {_id: 234, username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
        {_id: 345, username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
        {_id: 456, username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
    ];

    app.get('/api/user', findUser);
    app.get('/api/user/:uid', findUserById);
    app.get('/api/user?username=username', findUserByUsername);
    app.get('/api/user?username=username&password=password', findUserByCredentials);
    app.post('/api/user', createUser);
    app.put('/api/user/:uid',updateUser);
    app.delete('/api/user/:uid',deleteUser);


    /**
     * method to get next user id.
     * @returns {number}
     * user id
     */
    function getNewId() {
        return parseInt(users[users.length - 1]._id) + 1;
    }

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
        for (u in users) {
            if (users[u].username === username && users[u].password == password) {
                res.send(users[u]);
                return;
            }
        }
        res.send('0');
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
        for (u in users) {
            if (users[u].username === username) {
                res.send(users[u]);
                return;
            }
        }
        res.send('0');
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
        var id = parseInt(req.params.uid);
        for (u in users) {
            if (users[u]._id === id) {
                res.send(users[u]);
                return;
            }
        }
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
        user._id = getNewId();
        users.push(user);
        res.send(user);
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
        for (i = 0; i < users.length; i++) {
            if (users[i]._id == user._id) {
                users[i] = user;
                break;
            }
        }
        res.sendStatus(200);
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
        for (i = 0; i < users.length; i++) {
            if (users[i]._id == uid) {
                users.splice(i,1);
                break;
            }
        }
        res.sendStatus(200);
    }
};