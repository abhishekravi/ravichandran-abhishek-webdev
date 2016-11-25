module.exports = function (app, model) {
    var multer = require('multer'); // npm install multer --save
    var upload = multer({dest: __dirname + '/../../public/assignment/uploads'});

    app.post("/api/upload", upload.single('myFile'), uploadImage);
    app.post("/api/page/:pid/widget", createWidget);
    app.put("/api/page/:pid/widget", sort);
    app.get("/api/page/:pid/widget", findWidgetsByPageId);
    app.get("/api/widget/:wgid", findWidgetById);
    app.put("/api/widget/:wgid", updateWidgetReq);
    app.delete("/api/widget/:wgid", deleteWidget);


    /**
     * method to create new widget.
     * @param req
     * request
     * @param res
     * response
     */
    function createWidget(req, res) {
        var widget = req.body;
        var maxPos = 0;
        model.widgetModel.findAllWidgetsForPage(req.params.pid)
            .then(function (widgets) {
                    //get the max position and increment it for the new object.
                    if (widgets.length == 0)
                        widget.pos = 0;
                    else {
                        for (i in widgets) {
                            if (widgets[i].pos > maxPos)
                                maxPos = widgets[i].pos;
                        }
                        widget.pos = maxPos + 1;
                    }
                    model.widgetModel.createWidget(req.params.pid, widget)
                        .then(function (widget) {
                            res.send(widget);
                        }, function (error) {
                            res.sendStatus(400).send(error);
                        })
                }
            )
    }


    /**
     * method to find widgets by page id.
     * @param req
     * request
     * @param res
     * response
     */
    function findWidgetsByPageId(req, res) {
        var pid = req.params.pid;
        model.widgetModel.findAllWidgetsForPage(pid)
            .then(function (widgets) {
                widgets.sort(function (a, b) {
                    return a.pos - b.pos;
                });
                res.send(widgets);
            }, function (error) {
                res.sendStatus(400).send(error);
            });
    }

    /**
     * method to find widget by widget id.
     * @param req
     * request
     * @param res
     * response
     */
    function findWidgetById(req, res) {
        var wgid = req.params.wgid;
        model.widgetModel.findWidgetById(wgid)
            .then(function (widget) {
                res.send(widget);
            }, function (error) {
                res.sendStatus(400).send(error);
            });
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
        if (widget.pos) {
            model.widgetModel.updateWidget(widgetId, widget)
                .then(function (w) {
                    res.sendStatus(200);
                }, function (error) {
                    res.sendStatus(400).send(error);
                });
        } else {
            model.widgetModel.updateImageURL(widgetId, widget.url)
                .then(function (w) {
                    res.sendStatus(200);
                }, function (error) {
                    res.sendStatus(400).send(error);
                });
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
        model.widgetModel.deleteWidget(req.params.wgid)
            .then(function () {
                res.sendStatus(200);
            }, function (error) {
                res.sendStatus(400).send(error);
            });
    }

    /**
     * method to upload image to server.
     * @param req
     * request
     * @param res
     * response
     */
    function uploadImage(req, res) {
        var myFile = req.file;
        res.send(myFile);
    }

    /**
     * method to update widget positions.
     * @param req
     * request
     * @param res
     * response
     */
    function sort(req, res) {
        var pid = req.params.pid;
        var query = req.query;
        var start = parseInt(query.start);
        var end = parseInt(query.end);
        model.widgetModel.reorderWidget(pid, start, end)
            .then(function (s) {
                res.sendStatus(200);
            },function (error) {
                res.sendStatus(400).send(error);
            });
    }
}
;