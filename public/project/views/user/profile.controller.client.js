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
    function ProfileController($routeParams, UserService) {
        var vm = this;
        vm.userId = $routeParams["uid"];

        /**
         * to initializr profile page.
         */
        function init() {
            vm.user = UserService.findUserById(vm.userId);
        }

        init();
    }

})();