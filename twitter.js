var twitter = require('twitter');
var config = require("./config.js");

var t = new twitter(config);
var server = require("./server.js");
console.log(server.username);