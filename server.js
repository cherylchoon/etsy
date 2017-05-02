/*
    Main Server File
*/
console.log("/server.js");
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var fs = require('fs');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "client")));
app.use(express.static(path.join(__dirname, "bower_components")));
app.use(express.static(path.join(__dirname, "uploads")));

require("./server/config/mongoose");
require("./server/config/routes")(app);

app.listen(8000, function () {
    console.log("Listening on Port 8000");
});
