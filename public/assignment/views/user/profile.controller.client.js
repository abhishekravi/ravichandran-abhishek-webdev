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
        vm.userId = $routeParams["uid"];
        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;
        /**
         * to initializr profile page.
         */
        function init() {
             var ret = UserService.findUserById(vm.userId);
            ret
                .success(function(user){
                    vm.user = user;
                })
                .error(function(user){

                });

        }

        init();

        function updateUser(){
            UserService.updateUser(vm.user);
        }

        function deleteUser(){
            UserService.deleteUser(vm.userId)
                .success(function(){
                    $location.url("/login");
                })
                .error(function(){

                });

        }
    }

})();