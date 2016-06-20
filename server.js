'use strict'

var express = require('express');
var routes = require("moment");
var bodyParser = require("body-parser");

var routes = require("./app/routes/index.js");
var api = require("./app/app.js");

var app = express();

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/public', express.static(process.cwd() + '/public'));

routes(app);
api(app);

app.listen(8080, function() {
  console.log("Node.js listening on port 8080");
});
