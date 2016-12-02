/**
 * register controller.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    /**
     * contains register controller methods.
     * @param $location
     * for redirection
     * @param UserService
     * user service
     * @constructor
     */
    function RegisterController($location, UserService) {
        var vm = this;
        vm.register = register;

        /**
         * mehtod to register new user.
         * @param user
         * user object
         */
        function register(user) {
            if (!user || user.username == '' || !user.password || user.password == '') {
                $('#registerAlert').removeClass('hidden');
                vm.alert = 'Please enter the required details';
            } else if (user.password != user.vpassword) {
                $('#registerAlert').removeClass('hidden');
                vm.alert = 'Password does not match';
            } else {
                $('#registerAlert').addClass('hidden');
                user = UserService.createUser(user)
                    .success(function (user) {
                        $location.url("/user");
                    })
                    .error(function (error) {
                        console.log(error);
                    });
            }

        }
    }

})();