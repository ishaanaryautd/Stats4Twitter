require('dotenv').config();
module.exports = {
    callTwitterAPI : getTweetsByUsername,
    getTweetsByID : getTweetsByID,
    watson : watson,
    callingAPIFunction : callingAPIFunction
}
function getTweetsByUsername(username){
    var Twitter = require('twitter');
    var t = new Twitter({
        consumer_key: process.env.twitter_consumer_key,
        consumer_secret: process.env.twitter_consumer_secret,
        access_token_key: process.env.twitter_access_token_key,
        access_token_secret: process.env.twitter_access_token_secret
    });

    var params = {
        screen_name : username,
        include_rts : false,
        tweet_mode: 'extended'
    };

    return new Promise((resolve, reject) => {
        t.get('statuses/user_timeline', params, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

function getTweetsByID(ids){
    var Twitter = require('twitter');
    var t = new Twitter({
        consumer_key: process.env.twitter_consumer_key,
        consumer_secret: process.env.twitter_consumer_secret,
        access_token_key: process.env.twitter_access_token_key,
        access_token_secret: process.env.twitter_access_token_secret
    });

    var params = {
        id : ids,
        include_entities : true,
        tweet_mode: 'extended'
    };

    return new Promise((resolve, reject) => {
        t.get('statuses/lookup', params, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

function watson(tweetText) {
	
	const params = {
        'textToAnalyze': tweetText,
        "url": "https://gateway.watsonplatform.net/personality-insights/api",
        "username": "6f5ec39d-de4b-4098-af90-01c011a8ac8d",
        "password": "U5hNHR12tzbm",
        'use_unauthenticated' : false
    }
	
    return new Promise(function (resolve, reject) {
        const PersonalityInsightsV3 = require('watson-developer-cloud/personality-insights/v3');

        var url = params.url || 'https://gateway.watsonplatform.net/personality-insights/api' ;
        var use_unauthenticated =  params.use_unauthenticated || false ;

        const personality_insights = new PersonalityInsightsV3({
            'username': params.username,
            'password': params.password,
            'version_date': '2016-05-20',
            'url' : url,
            'use_unauthenticated': use_unauthenticated
        });

        personality_insights.profile({'content': params.textToAnalyze, content_type: 'text/plain'},
            function(err, res) {
                if (err)
                    reject(err);
                else
                    resolve(res);
            });
    });
}

async function callingAPIFunction(username){
	var tweetText = "";
    var likesTotal = 0;
    var reTweetsTotal = 0;
	var return_data = {};
	
    var a = await getTweetsByUsername(username);

    for(var i = 0; i < a.length; i++){
        tweetText = tweetText + " " + a[i].full_text;
        likesTotal += a[i].favorite_count;
        reTweetsTotal += a[i].retweet_count;
    }
	
	var likesAverage = likesTotal/a.length;
    var retweetsAverage = reTweetsTotal/a.length;
	
    return_data["AverageLikes"] = likesAverage;
	return_data["AverageRetweets"] = retweetsAverage;
	    
	var trimTop5Likes = [];
	var trimTop5Retweets = [];
	var modifiedTweetsForLikes = {};
    var modifiedTweetsForRetweets = {};
        
    for(var i = 0; i < a.length; i++){
        modifiedTweetsForLikes[a[i].id_str] = a[i].favorite_count;
        modifiedTweetsForRetweets[a[i].id_str] = a[i].retweet_count;
    }
        
    var sortedByLikes = sortProperties(modifiedTweetsForLikes);
    var sortedByRetweets = sortProperties(modifiedTweetsForRetweets);  
        
    for(var i = sortedByLikes.length - 1; i >= sortedByLikes.length - 5; i--){
        trimTop5Likes.push((sortedByLikes[i])[0]);
    }
    for(var i = sortedByRetweets.length - 1; i >= sortedByRetweets.length - 5; i--){
        trimTop5Retweets.push((sortedByRetweets[i])[0]);
    }
	
	var top5LikesIDs = "";
    for(var i = 0; i < trimTop5Likes.length; i++){
        top5LikesIDs = top5LikesIDs + trimTop5Likes[i] + ",";
    }
    top5LikesIDs = top5LikesIDs.slice(0, -1);

	// *** Call a function to get the top 5 tweets by likes here **** Use var b
    var b = await getTweetsByID(top5LikesIDs);
    return_data["Top5LikedTweets"] = [];
    for(var i = 0; i < b.length; i++){
        if(b[i].extended_entities == null){
            return_data["Top5LikedTweets"][i] = {
                tweet : b[i].full_text,
                likes : b[i].favorite_count,
                imageURL : null
            };
        }
        else{
            return_data["Top5LikedTweets"][i] = {
                tweet : b[i].full_text,
                likes : b[i].favorite_count,
                imageURL : b[i].extended_entities.media[0].media_url 
            };
        }
    }

    var top5RetweetsIDs = "";
    for(var i = 0; i < trimTop5Retweets.length; i++){
        top5RetweetsIDs = top5RetweetsIDs + trimTop5Retweets[i] + ",";
    }
	top5RetweetsIDs = top5RetweetsIDs.slice(0, -1);

	// *** Call a function to get the top 5 tweets by retweets here **** Use var c
	var c = await getTweetsByID(top5RetweetsIDs);
    return_data["Top5RetweetedTweets"] = [];
    for(var i = 0; i < c.length; i++){
        if(c[i].extended_entities == null){
            return_data["Top5RetweetedTweets"][i] = {
                tweet : c[i].full_text,
                retweets : b[i].retweet_count,
                imageURL : null
            };
        }
        else{
            return_data["Top5RetweetedTweets"][i] = {
                tweet : c[i].full_text,
                retweets : b[i].retweet_count,
                imageURL : c[i].extended_entities.media[0].media_url 
            };
        }
    }
	//Send tweets to watson
    var d = await watson(tweetText);
   
	return_data[(((d.personality)[0]).name)] = (((d.personality)[0]).percentile);
	return_data[(((d.personality)[1]).name)] = (((d.personality)[1]).percentile);
	return_data[(((d.personality)[2]).name)] = (((d.personality)[2]).percentile);
	return_data[(((d.personality)[3]).name)] = (((d.personality)[3]).percentile);
    return_data[(((d.personality)[4]).name)] = (((d.personality)[4]).percentile);

    return return_data;  
}

//function from github https://gist.github.com/umidjons/9614157
function sortProperties(obj){
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