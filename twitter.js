require('dotenv').config();

module.exports = {
    getTweets: getTweetsFromUsername
};

function getTweetsFromUsername(username){
    var Twitter = require('twitter');
    var t = new Twitter({
        consumer_key: process.env.twitter_consumer_key,
        consumer_secret: process.env.twitter_consumer_secret,
        access_token_key: process.env.twitter_access_token_key,
        access_token_secret: process.env.twitter_access_token_secret
    });

    var params = {
        screen_name : username,
        count : 5
    };

    t.get('statuses/user_timeline', params, function(err, tweets, response){
        if(err){
            console.log("Could not get tweets " + err[0].message);
        }
        else{
            console.log(tweets);
        }
    });
}

    