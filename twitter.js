require('dotenv').config();

module.exports = {
    getTweets: getTweetsFromUsername
};

//We will return json from this function with all the required things
function getTweetsFromUsername(username){
	
	var jsonResult = {};
    var Twitter = require('twitter');
    var t = new Twitter({
        consumer_key: process.env.twitter_consumer_key,
        consumer_secret: process.env.twitter_consumer_secret,
        access_token_key: process.env.twitter_access_token_key,
        access_token_secret: process.env.twitter_access_token_secret
    });

    var params = {
        screen_name : username,
        count : 10,
        include_rts : false,
		tweet_mode: 'extended'
    };

    t.get('statuses/user_timeline', params, function(err, tweets, response){
        if(err){
            console.log("Could not get tweets " + err[0].message);
        }
        else{
			var tweetText = "";
			var likesTotal = 0;
			var reTweetsTotal = 0;
            for(var i = 0; i < tweets.length; i++){
                tweetText = tweetText + " " + tweets[i].text;
				likesTotal += tweets[i].favorite_count;
				reTweetsTotal += tweets[i].retweet_count;
            }
			
			var likesAverage = likesTotal/tweets.length;
			var retweetsAverage = reTweetsTotal/tweets.length;
			
			//************Adding to final return object*********************
			jsonResult["AverageLikes"] = likesAverage;
			jsonResult["AverageRetweets"] = retweetsAverage;
			
			//console.log(likesAverage);
			//console.log(retweetsAverage);
			
			//****************************
			//Do Watson stuff here with tweetText
			///***************************
			
			var modifiedTweetsForLikes = {};
			var modifiedTweetsForRetweets = {};
			
			for(var i = 0; i < tweets.length; i++){
				modifiedTweetsForLikes[tweets[i].id] = tweets[i].favorite_count;
				modifiedTweetsForRetweets[tweets[i].id] = tweets[i].retweet_count;
			}
			
			var sortedByLikes = sortProperties(modifiedTweetsForLikes);
			var sortedByRetweets = sortProperties(modifiedTweetsForRetweets);
			
			//console.log(sortedByLikes);
			//console.log(sortedByRetweets);
			
			var trimTop5Likes = [];
			var trimTop5Retweets = [];
			
			for(var i = sortedByLikes.length - 1; i >= sortedByLikes.length - 5; i--){
				trimTop5Likes.push((sortedByLikes[i])[0]);
			}
			
			//console.log(trimTop5Likes);
			
			for(var i = sortedByRetweets.length - 1; i >= sortedByRetweets.length - 5; i--){
				trimTop5Retweets.push((sortedByRetweets[i])[0]);
			}
			
			//console.log(trimTop5Retweets);
		
        }
    });
	return jsonResult;
}

//function from github https://gist.github.com/umidjons/9614157
function sortProperties(obj)
{
	// convert object into array
	var sortable=[];
	for(var key in obj)
	if(obj.hasOwnProperty(key))
	sortable.push([key, obj[key]]); // each item is an array in format [key, value]		
	// sort items by value
	sortable.sort(function(a, b)
	{
		return a[1]-b[1]; // compare numbers
	});
	return sortable; // array in format [ [ key1, val1 ], [ key2, val2 ], ... ]
}