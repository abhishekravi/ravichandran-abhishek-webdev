module.exports = function (app) {
    var multer = require('multer'); // npm install multer --save
    var upload = multer({ dest: __dirname+'/../../public/assignment/uploads' });
    var widgets = [
        { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO", "pos" : 0},
        { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum", "pos" : 1},
        { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "http://lorempixel.com/400/200/", "pos" : 2},
        { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>", "pos" : 3},
        { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum", "pos" : 4},
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E" , "pos" : 5},
        { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>", "pos" : 6  }
    ];

    app.post ("/api/upload", upload.single('myFile'), uploadImage);
    app.post ("/api/page/:pid/widget",  createWidget);
    app.put("/api/page/:pid/widget", sort);
    app.get ("/api/page/:pid/widget",  findWidgetsByPageId);
    app.get ("/api/widget/:wgid",  findWidgetById);
    app.put ("/api/widget/:wgid",  updateWidgetReq);
    app.delete ("/api/widget/:wgid",  deleteWidget);


    /**
     * method to create new widget.
     * @param req
     * request
     * @param res
     * response
     */
    function createWidget(req, res) {
        var widget = req.body;
        widget.pageId = req.params.pid;
        widget._id = getNewId();
        widget.pos = getNewPos(getWidgetsForPage(req.params.pid));
        widgets.push(widget);
        res.send(widget);
    }

    /**
     * method to get new widget id.
     * @returns {number}
     * widget id
     */
    function getNewId(){
        return parseInt(widgets[widgets.length - 1]._id) + 1;
    }

    /**
     * method to get new widget position.
     * @returns {number}
     * last position + 1
     */
    function getNewPos(widgets){
        if(widgets.length == 0)
            return 0;
        return parseInt(widgets[widgets.length - 1].pos) + 1;
    }

    /**
     * method to find widgets by page id.
     * @param req
     * request
     * @param res
     * response
     */
    function findWidgetsByPageId(req, res) {
        var pageId = req.params.pid;
        res.send(getWidgetsForPage(pageId));
    }

    /**
     * method to find widget by widget id.
     * @param req
     * request
     * @param res
     * response
     */
    function findWidgetById(req, res) {
        var widgetId = req.params.wgid;
        var i;
        var widget;
        for (i = 0; i < widgets.length; i++) {
            if (widgets[i]._id == widgetId) {
                widget = widgets[i];
                break;
            }
        }
        res.send(widget);
    }

    /**
     * method to update widget.
     * @param req
     * request
     * @param res
     * response
     */
    function updateWidgetReq(req, res) {
        var widgetId = req.params.wgid;
        var widget = req.body;
        updateWidget(widget, widgetId);
        res.sendStatus(200);
    }

    /**
     * method to update a widget.
     * @param widget
     * widget
     * @param widgetId
     * widget id
     */
    function updateWidget(widget, widgetId){
        var i;
        for (i = 0; i < widgets.length; i++) {
            if (widgets[i]._id == widgetId) {
                widgets[i] = widget;
                break;
            }
        }
    }

    /**
     * method to delete widget.
     * @param req
     * request
     * @param res
     * response
     */
    function deleteWidget(req, res) {
        var widgetId = req.params.wgid;
        var i;
        for (i = 0; i < widgets.length; i++) {
            if (widgets[i]._id == widgetId) {
                widgets.splice(i,1);
                break;
            }
        }
        res.sendStatus(200);
    }

    /**
     * method to upload image to server.
     * @param req
     * request
     * @param res
     * response
     */
    function uploadImage(req, res) {
        var myFile        = req.file;
        res.send(myFile);
    }

    /**
     * method to get all widgets for a page id, sorted by pos attribute.
     * @param pid
     * page id
     * @returns {Array}
     * array of widgets
     */
    function getWidgetsForPage(pid){
        var i;
        var allWidget = [];
        for (i = 0; i < widgets.length; i++) {
            if (widgets[i].pageId == pid) {
                allWidget.push(widgets[i]);
            }
        }
        allWidget.sort(function (a, b) {
           return a.pos - b.pos;
        });
        return allWidget;
    }

    /**
     * method to update widget positions.
     * @param req
     * request
     * @param res
     * response
     */
    function sort(req, res){
        var pageId = req.params.pid;
        var widgetArr = getWidgetsForPage(pageId);
        var query = req.query;
        var start = parseInt(query.start);
        var end = parseInt(query.end);
        widgetArr[start].pos = end;
        updateWidget(widgetArr[start], widgetArr[start]._id);
        widgetArr[end].pos = start;
        updateWidget(widgetArr[end], widgetArr[end]._id);
        res.sendStatus(200);
    }
};