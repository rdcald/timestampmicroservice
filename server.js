var express = require("express");
var moment = require("moment")
var path = require("path");
var api = require("./app.js");
var app = express();
var port = process.env.PORT || 8080;   

app.listen(port, function() {
  console.log("Node.js listening on port " + port);
});

app.get("/", function(req, res) {
    var file = path.join(__dirname, "index.html");
    res.sendFile(file, function (err) {
    if (err) {
      console.log(err);
      res.status(err.status).end();
    }
    else {
      console.log('Sent:', file);
    }
  });
});

app.get("/:date", function(req, res) {
    var date = req.params.date;

    if (date.isValid()) {
        res.json({
            "unix": date.moment(date, "X"),
            "natural": date.moment(date, "MMMM D, YYYY")
        });
    }
    else {
        res.json({
            "unix": null,
            "natural": null
        });        
    }
});
