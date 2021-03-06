/**
 * profile controller.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    /**
     * contains profile controller methods.
     * @param $routeParams
     * get route parameters
     * @param UserService
     * user sevice
     * @constructor
     */
    function ProfileController($location, $routeParams, UserService) {
        var vm = this;
        //vm.userId = $routeParams["uid"];
        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;
        vm.logout = logout;
        /**
         * to initializr profile page.
         */
        function init() {
             //var ret = UserService.findUserById(vm.userId);
            var ret = UserService.findCurrentUser();
            ret
                .success(function(user){
                    vm.user = user;
                })
                .error(function(e){
                    console.log(e);
                });

        }

        init();

        /**
         * method to update user.
         */
        function updateUser(){
            UserService.updateUser(vm.user);
        }

        /**
         * method to delete the user.
         */
        function deleteUser(){
            UserService.deleteUser(vm.user._id)
                .success(function(){
                    $location.url("/login");
                })
                .error(function(e){
                    console.log(e);
                });

        }
        
        function logout() {
            UserService.logout()
                .success(function () {
                    $location.url("/login");
                })
        }
    }

})();