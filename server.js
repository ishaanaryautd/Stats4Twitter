const express = require("express");
var app = express();
const async = require("async");
require('dotenv').config();

app.use(express.static('public'));

app.get('/', function(req,res,next){
	res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get('/data', function(req,res,next){
    var api = require('./api.js');
	api.callingAPIFunction("iamsrk").then(function(data){
		res.json(data);
		console.log(data);
	}).catch(function(err){
		console.log(err);
	});
});

app.set('port', (process.env.PORT || 8080));

app.listen(app.get('port'),function(){
	console.log('Node app is running on port', app.get('port'));
});