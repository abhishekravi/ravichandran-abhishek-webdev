$(document).ready(function () {
    //load the website list page in the left pane
    $("#newleftpane").load("website-list.view.client.html");
    $("#editleftpane").load("website-list.view.client.html");
    $("#sortable").sortable();
    $("#sortable").disableSelection();
});

angular
    .module('WebAppMaker', ['ngRoute'])
    .config(Config);

function Config($routeProvider) {
    $routeProvider
        .when('/login',{
            templateUrl: '/views/user/login.view.client.html'
        });
}