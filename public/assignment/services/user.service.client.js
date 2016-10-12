(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);
    function UserService() {
        var users = [
            {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
            {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
            {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
        ];
        var api = {
            "createUser": createUser,
            "findUserById": findUserById,
            "findUserByUsername": findUserByUsername,
            "findUserByCredentials": findUserByCredentials,
            "updateUser": updateUser,
            "deleteUser": deleteUser
        };
        return api;

        //method to create user
        function createUser(user) {
            user._id = "567";
            users.push(user);
            return user;
        }

        //method to find user by userid
        function findUserById(userId) {
            var i;
            var user;
            for (i = 0; i < users.length; i++) {
                if (users[i]._id == userId) {
                    user = users[i];
                    break;
                }
            }
            return user;
        }

        //method to find user by username
        function findUserByUsername(username) {
            var i;
            var user;
            for (i = 0; i < users.length; i++) {
                if (users[i].username == username) {
                    user = users[i];
                    break;
                }
            }
            return user;
        }

        //method to find user by username and password
        function findUserByCredentials(username, password) {
            var i;
            var user;
            for (i = 0; i < users.length; i++) {
                if (users[i].username == username && users[i].password == password) {
                    user = users[i];
                    break;
                }
            }
            return user;
        }

        //method to update user
        function updateUser(userId, user) {
            for (i = 0; i < users.length; i++) {
                if (users[i]._id == userId) {
                    users[i] = user;
                    break;
                }
            }
        }

        //method to delete user
        function deleteUser(userId) {
            for (i = 0; i < users.length; i++) {
                if (users[i]._id == userId) {
                    users.splice(i,1);
                    break;
                }
            }
        }
    }
})();
