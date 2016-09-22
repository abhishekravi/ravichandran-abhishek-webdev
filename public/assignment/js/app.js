$(document).ready(function() {
    $("#leftpane").hide();
    $(window).on("orientationchange", function (event) {
        if(window.innerHeight < window.innerWidth){
            //alert("landscape");
            $("#leftpane").load("website-list.html");
            $("#leftpane").show();
        } else{
            $("#leftpane").empty();
            $("#leftpane").hide();
        }
    });
});