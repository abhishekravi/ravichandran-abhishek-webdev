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
            user = UserService.createUser(user)
                .success(function(user){
                    $location.url("/user/" + user._id);
                })
                .error(function(error){

                });

        }
    }

})();