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
        if (err) throw err;
    });
});


app.get('/:date', function(req,res) {
    var date = req.params.date;
    var newDate;
    
    if(+date === parseInt(date, 10)) {
        newDate = moment(date, "X");
    } 
    else {
        newDate = moment(date, "MMMM D, YYYY");
    }

    if(newDate.isValid()) {
        res.json({
            unix: newDate.format("X"),
            natural: newDate.format("MMMM D, YYYY")
        });
    } 
    else {
        res.json({
            unix: null,
            natural: null
        });
    }
});