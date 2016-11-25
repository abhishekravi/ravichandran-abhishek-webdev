/**
 * flicker image search controller.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("FlickrWidgetController", FlickrWidgetController);

    /**
     * flickr widget controller.
     * @param $location
     * for relocation
     * @param $routeParams
     * to get route parameters
     * @param FlickrService
     * flickr service
     * @param WidgetService
     * widget service
     * @constructor
     */
    function FlickrWidgetController($location, $routeParams, FlickrService, WidgetService, $scope) {

        var vm = this;
        vm.uid = $routeParams["uid"];
        vm.wid = $routeParams["wid"];
        vm.pid = $routeParams["pid"];
        vm.wgid = $routeParams["wgid"];
        vm.searchPhotos = searchPhotos;
        vm.selectPhoto = selectPhoto;

        /**
         * method to search photos through flickr api.
         */
        function searchPhotos() {
            FlickrService
                .searchPhotos(vm.searchText)
                .then(function (response) {
                    data = response.data.replace("jsonFlickrApi(", "");
                    data = data.substring(0, data.length - 1);
                    data = JSON.parse(data);
                    vm.photos = data.photos;
                });
        }

        /**
         * method to update widget with selected photo.
         * @param photo
         * photo object
         */
        function selectPhoto(photo) {
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";
            if (vm.wgid) {
                var ret = WidgetService.updateImage(vm.wgid, url);
                ret.success(function (response) {
                    $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget/" + vm.wgid);
                });
            }else {
                WidgetService.imgURL = url;
                $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget/new/IMAGE");
            }

        }
    }
})();