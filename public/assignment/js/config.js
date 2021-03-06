/**
 * route config for application.
 */
(function() {
    angular
        .module("WebAppMaker")
        .config(Config);
    function Config($routeProvider) {
        $routeProvider
            .when("/login", {
                templateUrl: "/assignment/views/user/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/", {
                templateUrl: "/assignment/views/user/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "/assignment/views/user/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/user/:uid", {
                templateUrl: "/assignment/views/user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    checkLogin: checkLogin
                }
            })
            .when("/user", {
                templateUrl: "/assignment/views/user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    checkLogin: checkLogin
                }
            })
            .when("/user/:uid/website", {
                templateUrl: "/assignment/views/website/website-list.view.client.html",
                controller: "WebsiteListController",
                controllerAs: "model",
                resolve: {
                    checkLogin: checkLogin
                }
            })
            .when("/user/:uid/website/new", {
                templateUrl: "/assignment/views/website/website-new.view.client.html",
                controller: "NewWebsiteController",
                controllerAs: "model",
                resolve: {
                    checkLogin: checkLogin
                }
            })
            .when("/user/:uid/website/:wid", {
                templateUrl: "/assignment/views/website/website-edit.view.client.html",
                controller: "EditWebsiteController",
                controllerAs: "model",
                resolve: {
                    checkLogin: checkLogin
                }
            })
            .when("/user/:uid/website/:wid/page", {
                templateUrl: "/assignment/views/page/page-list.view.client.html",
                controller: "PageListController",
                controllerAs: "model",
                resolve: {
                    checkLogin: checkLogin
                }
            })
            .when("/user/:uid/website/:wid/page/new", {
                templateUrl: "/assignment/views/page/page-new.view.client.html",
                controller: "NewPageController",
                controllerAs: "model",
                resolve: {
                    checkLogin: checkLogin
                }
            })
            .when("/user/:uid/website/:wid/page/:pid", {
                templateUrl: "/assignment/views/page/page-edit.view.client.html",
                controller: "EditPageController",
                controllerAs: "model",
                resolve: {
                    checkLogin: checkLogin
                }
            })
            .when("/user/:uid/website/:wid/page/:pid/widget", {
                templateUrl: "/assignment/views/widget/widget-list.view.client.html",
                controller: "WidgetListController",
                controllerAs: "model",
                resolve: {
                    checkLogin: checkLogin
                }
            })
            .when("/user/:uid/website/:wid/page/:pid/widget/new", {
                templateUrl: "/assignment/views/widget/widget-choose.view.client.html",
                controller: "NewWidgetController",
                controllerAs: "model",
                resolve: {
                    checkLogin: checkLogin
                }
            })
            .when("/user/:uid/website/:wid/page/:pid/widget/new/:type", {
                templateUrl: "/assignment/views/widget/widget-new.view.client.html",
                controller: "NewWidgetController",
                controllerAs: "model",
                resolve: {
                    checkLogin: checkLogin
                }
            })
            .when("/user/:uid/website/:wid/page/:pid/widget/:wgid", {
                templateUrl: "/assignment/views/widget/widget-edit.view.client.html",
                controller: "EditWidgetController",
                controllerAs: "model",
                resolve: {
                    checkLogin: checkLogin
                }
            })
            .when("/user/:uid/website/:wid/page/:pid/widget/:wgid/search", {
                templateUrl: "/assignment/views/widget/widget-flickr-search.view.client.html",
                controller: "FlickrWidgetController",
                controllerAs: "model",
                resolve: {
                    checkLogin: checkLogin
                }
            })
            .when("/user/:uid/website/:wid/page/:pid/widget/new/IMAGE/search", {
                templateUrl: "/assignment/views/widget/widget-flickr-search.view.client.html",
                controller: "FlickrWidgetController",
                controllerAs: "model",
                resolve: {
                    checkLogin: checkLogin
                }
            })
            .otherwise({redirectTo : '/login'});

        function checkLogin($q, UserService, $location) {
            var deferred = $q.defer();
            UserService.checkLogin()
                .success(function (user) {
                    if(user != '0')
                        deferred.resolve();
                    else {
                        deferred.reject();
                        $location.url("/");
                    }
                });
            return deferred.promise;
        }
    }
})();
