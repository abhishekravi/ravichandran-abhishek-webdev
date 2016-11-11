/**
 * edit widget controller.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("EditWidgetController", EditWidgetController);

    /**
     * contains edit widget controller methods.
     * @param $location
     * for relocation
     * @param $routeParams
     * to get route params
     * @param WidgetService
     * widget service
     * @constructor
     */
    function EditWidgetController($location, $routeParams, WidgetService) {
        var vm = this;
        vm.uid = $routeParams["uid"];
        vm.wid = $routeParams["wid"];
        vm.pid = $routeParams["pid"];
        vm.wgid = $routeParams["wgid"];
        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;
        vm.uploadImage = uploadImage;
        vm.searchImage = searchImage;

        /**
         * method to fetch all widgets before loading.
         */
        function init() {
            var ret = WidgetService.findWidgetById(vm.wgid);
            ret
                .success(function (widget) {
                    vm.widget = widget;
                })
                .error(function (e) {

                });
        }

        init();

        /**
         * method to update widget.
         */
        function updateWidget() {
            if(vm.widget.width)
                vm.widget.width = vm.widget.width + '%';
            var ret = WidgetService.updateWidget(vm.wgid, vm.widget);
            ret
                .success(function (s) {
                    $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget");
                })
                .error(function (e) {

                });
        }

        /**
         * method to delete widget.
         */
        function deleteWidget() {
            var ret = WidgetService.deleteWidget(vm.wgid);
            ret
                .success(function (s) {
                    $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget");
                })
                .error(function (e) {

                });
        }

        /**
         * method to upload image and get path.
         */
        function uploadImage() {
            var formData = new FormData($('#imageUpload')[0]);
            $.ajax({
                url: '/api/upload',
                contentType: false,
                processData: false,
                data: formData,
                type: 'POST',
                success: function (data) {
                    vm.widget.url = 'uploads/' + data.filename;
                    $('#imgUp').removeClass('has-error');
                    $('#imgUp').find('span').removeClass('glyphicon-remove');
                    $('#imgUp').addClass('has-success');
                    $('#imgUp').find('span').addClass('glyphicon-ok');
                    console.log(data);
                },
                error: function (request, status, error) {
                    console.log(request.responseText);
                    $('#imgUp').removeClass('has-success');
                    $('#imgUp').find('span').removeClass('glyphicon-ok');
                    $('#imgUp').addClass('has-error');
                    $('#imgUp').find('span').addClass('glyphicon-remove');
                }
            });
        }

        /**
         * redirection to search page.
         */
        function searchImage(){
            $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget/" + vm.wgid + "/search");
        }
    }

})();
    
    