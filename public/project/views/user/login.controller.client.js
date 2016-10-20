/**
 * login controller.
 */
(function () {
    angular
        .module("MyApp")
        .controller("LoginController", LoginController);

    /**
     * contains login controller methods.
     * @param $location
     * for redirecting
     * @param UserService
     * user services
     * @constructor
     */
    function LoginController($location, UserService) {
        var vm = this;
        vm.login = login;

        /**
         * method to check credentials and login if found.
         * @param user
         * user object
         */
        function login(user) {
            if (user) {
                user = UserService.findUserByCredentials(user.username, user.password);
                if (user) {
                    $location.url("/user/" + user._id);
                } else {
                    vm.alert = "Unable to login. Invalid username/password";
                }
            } else {
                vm.alert = "Enter credentials to login";
            }
        }
    }

})();