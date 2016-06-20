'use strict'
var express = require('express');
var routes = require("")
var api = require("/app/app.js");
var app = express();

app.get("/", function(req, res) {
  res.send("Enter a date or unix timestamp in the url query")
});

api(app);

app.listen(8080, function() {
  console.log("Node.js listening on port 8080");
});
