/**
 * user view service.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    /**
     * contains all user view service methods.
     * @returns {{createUser: createUser, findUserById: findUserById, findUserByUsername: findUserByUsername, findUserByCredentials: findUserByCredentials, updateUser: updateUser, deleteUser: deleteUser}}
     * @constructor
     */
    function UserService($http) {
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
           return $http.post('/api/user',user);
        }

        /**
         * method to find user by userid.
         * @param userId
         * user id
         * @returns {*}
         * user object
         */
        function findUserById(userId) {
            var url = '/api/user/' + userId;
            return $http.get(url);
        }

        /**
         * method to find user by username.
         * @param username
         * user name
         * @returns {*}
         * user object
         */
        function findUserByUsername(username) {
            var url = '/api/user?username='+username;
            return $http.get(url);
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
            var url = '/api/user?username='+username+'&password='+password;
            return $http.get(url);
        }

        /**
         * method to update user.
         * @param user
         * user object
         */
        function updateUser(user) {
            return $http.put('/api/user/'+user._id, user);
        }

        /**
         * method to delete user.
         * @param userId
         * user id
         */
        function deleteUser(uid) {
            return $http.delete('/api/user/'+uid);
        }
    }
})();
