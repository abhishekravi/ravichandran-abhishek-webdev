/**
 * user view service.
 */
(function () {
    angular
        .module("MyApp")
        .factory("UserService", UserService);

    /**
     * contains all user view service methods.
     * @returns {{createUser: createUser, findUserById: findUserById, findUserByUsername: findUserByUsername, findUserByCredentials: findUserByCredentials, updateUser: updateUser, deleteUser: deleteUser}}
     * @constructor
     */
    function UserService() {
        var users = [
            {_id: "123", username: "arthas", password: "warcraft", firstName: "Arthas", lastName: "Menethil"},
            {_id: "234", username: "isaac", password: "deadspace", firstName: "Isaac", lastName: "Clarke"},
            {_id: "345", username: "clark", password: "superman", firstName: "Clark", lastName: "Kent"},
            {_id: "456", username: "bruce", password: "batman", firstName: "Bruce", lastName: "Wayne"}
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

        /**
         * creates new user.
         * @param user
         * user object
         * @returns {*}
         * user object
         */
        function createUser(user) {
            user._id = "567";
            users.push(user);
            return user;
        }

        /**
         * method to find user by userid.
         * @param userId
         * user id
         * @returns {*}
         * user object
         */
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

        /**
         * method to find user by username.
         * @param username
         * user name
         * @returns {*}
         * user object
         */
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

        /**
         * method to find user by username and password.
         * @param username
         * username
         * @param password
         * password
         * @returns {*}
         * user object
         */
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

        /**
         * method to update user.
         * @param userId
         * user id
         * @param user
         * user object
         */
        function updateUser(userId, user) {
            for (i = 0; i < users.length; i++) {
                if (users[i]._id == userId) {
                    users[i] = user;
                    break;
                }
            }
        }

        /**
         * method to delete user.
         * @param userId
         * user id
         */
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
