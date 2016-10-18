
(function() {
    angular
        .module("MyApp", ['ngRoute'])
        .config(Config);
    function Config($routeProvider) {
        $routeProvider
            .when("/login", {
                templateUrl: "/project/views/user/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/", {
                templateUrl: "/project/views/home/home.view.client.html",
                controller: "HomeController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "/project/views/user/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/user/:uid", {
                templateUrl: "/project/views/user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model"
            })
            .otherwise({redirectTo : '/'})
    }
})();
