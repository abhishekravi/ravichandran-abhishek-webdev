/**
 * new widget controller.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("NewWidgetController", NewWidgetController);

    /**
     * contains new widget contoller methods.
     * @param $location
     * for redirection
     * @param $routeParams
     * to get route params
     * @param WidgetService
     * widget service
     * @constructor
     */
    function NewWidgetController($location, $routeParams, WidgetService) {
        var vm = this;
        vm.uid = $routeParams["uid"];
        vm.wid = $routeParams["wid"];
        vm.pid = $routeParams["pid"];
        vm.type = $routeParams["type"];
        vm.createWidget = createWidget;
        vm.uploadImage = uploadImage;
        vm.searchImage = searchImage;
        vm.widget = new Object();
        if(WidgetService.imgURL) {
            vm.widget.url = WidgetService.imgURL;
            $('#imgurl').val(WidgetService.imgURL);
            WidgetService.imgURL = "";
        }

        /**
         * method to create a widget.
         */
        function createWidget(){
            if(!vm.widget || !vm.widget.name || vm.widget.name == ''){
                $('#newWidgetAlert').removeClass('hidden');
                vm.alert = 'name required';
            } else {
                vm.widget.type = vm.type;
                var ret = WidgetService.createWidget(vm.pid, vm.widget);
                ret
                    .success(function (widget) {
                        $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget");
                    })
                    .error(function (e) {
                        console.log(e);
                    });
            }
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
                    $('#imgurl').val('uploads/' + data.filename);
                    $('#imgUp').removeClass('has-error');
                    $('#imgUp').find('span').removeClass('glyphicon-remove');
                    $('#imgUp').addClass('has-success');
                    $('#imgUp').find('span').addClass('glyphicon-ok');
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
            $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget/new/IMAGE/search");
        }
    }

})();