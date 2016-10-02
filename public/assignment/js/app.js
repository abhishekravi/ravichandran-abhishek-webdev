$(document).ready(function () {
    //load the website list page in the left pane
    $("#newleftpane").load("website-list.html");
    $("#editleftpane").load("website-list.html");
    $("#sortable").sortable();
    $("#sortable").disableSelection();
});