var express = require("express");
var moment = require("moment")
var fs = require("fs");
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

app.get("/:query", function(req, res) {
    var date = req.params.query;
    var unix;
    var natty;
    var dateJSON = { "unix": unix, "natural": natty }
        
    if (+date === parseInt(date, 10)) {
        unix = +date;
        natty = unixToNatty(unix);
    }
    else if (moment(date, "MMMM D, YYYY").isValid()) {
        natty = date;
        unix = nattyToUnix(natty);
    }
    else {
        unix = null;
        natty = null;
    }
        
    res.json(dateJSON);
});
    
function unixToNatty(unix) {
    return moment.unix(unix).format("MMMM D, YYYY");
}
    
function nattyToUnix(natty) {
    return natty.unix();
}
