module.exports = function (app) {
    var multer = require('multer'); // npm install multer --save
    var upload = multer({ dest: __dirname+'/../../public/assignment/uploads' });
    var widgets = [
        { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
        { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "http://lorempixel.com/400/200/"},
        { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
        { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E" },
        { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    ];

    app.post ("/api/upload", upload.single('myFile'), uploadImage);
    app.post ("/api/page/:pid/widget",  createWidget);
    app.get ("/api/page/:pid/widget",  findWidgetsByPageId);
    app.get ("/api/widget/:wgid",  findWidgetById);
    app.put ("/api/widget/:wgid",  updateWidget);
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
     * method to find widgets by page id.
     * @param req
     * request
     * @param res
     * response
     */
    function findWidgetsByPageId(req, res) {
        var pageId = req.params.pid;
        var i;
        var allWidget = [];
        for (i = 0; i < widgets.length; i++) {
            if (widgets[i].pageId == pageId) {
                allWidget.push(widgets[i]);
            }
        }
        res.send(allWidget);
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
    function updateWidget(req, res) {
        var widgetId = req.params.wgid;
        var widget = req.body;
        var i;
        for (i = 0; i < widgets.length; i++) {
            if (widgets[i]._id == widgetId) {
                widgets[i] = widget;
                break;
            }
        }
        res.sendStatus(200);
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


        var widgetId      = req.body.widgetId;
        var width         = req.body.width;
        var myFile        = req.file;


        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;
        res.send(myFile);
    }
};