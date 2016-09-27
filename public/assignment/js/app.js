$(document).ready(function() {
    //load the website list page in the left pane
    $("#newleftpane").load("website-list.html");
    $("#editleftpane").load("website-list.html");
    $(window).on("orientationchange", function (event) {
        //to resize the pane when orientataion changes
        if(window.innerHeight < window.innerWidth){
            $("#newrightpane").addClass("col-xs-6");
            $("#editrightpane").addClass("col-xs-6");
        } else{
            $("#newrightpane").removeClass("col-xs-6");
            $("#editrightpane").removeClass("col-xs-6");
        }
    });
});