(function () {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService) {
        var vm = this;
        vm.register = register;

        function register(user) {
            user = UserService.createUser(user);
            $location.url("/user/" + user._id);
        }
    }

})();