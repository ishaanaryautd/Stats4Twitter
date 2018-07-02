var twitter = require('twitter');
var config = require("./config.js");

function getTweets(username){
    var t = new twitter(config);
    var params = {
        screen_name : username,
        count : 5
    };

    t.get('statuses/user_timeline', params, function(err, data, response){
        if(err){
            console.log("Could not get tweets " + err[0].message);
        }
        else{
            console.log(data);
        }
    })


}