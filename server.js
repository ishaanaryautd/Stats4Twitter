const express = require("express");
var app = express();
const async = require("async");

app.use(express.static('public'));

app.get('/', function(req,res,next){
	res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get('/data', function(req,res,next){
	var t = require('./twitter.js')
	var resultFromTwitter = t.getTweets(req.query.twitterUsername);
});

app.set('port', (process.env.PORT || 8080));

app.listen(app.get('port'),function(){
	console.log('Node app is running on port', app.get('port'));
});