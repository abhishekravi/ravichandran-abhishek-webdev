(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController);

    function LoginController($location, UserService) {
        var vm = this;
        vm.login = login;

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