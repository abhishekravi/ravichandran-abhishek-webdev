/**
 * login controller.
 */
(function () {
    angular
        .module("WebAppMaker")
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
                var ret = UserService.findUserByCredentials(user.username, user.password);
                ret
                    .success(function(user){
                        if (user != '0') {
                            $location.url("/user/" + user._id);
                        } else {
                            vm.alert = "Unable to login. Invalid username/password";
                        }
                    })
                    .error(function() {

                    });

            } else {
                vm.alert = "Enter credentials to login";
            }
        }
    }

})();