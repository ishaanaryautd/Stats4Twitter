require('dotenv').config();

module.exports = {
    getTweets: getTweetsFromUsername
};

function tweetsByUser(twitterObj, params){
    return new Promise((resolve, reject) => {
        twitterObj.get('statuses/user_timeline', params, (err, data) => {
           if (err) {
               reject(err);
           } else {
               resolve(data);
           }
        });
     });
}
function watson(params) {
    return new Promise(function (resolve, reject) {
        var res = {};

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

        personality_insights.profile({'text': params.textToAnalyze},
            function(err, res) {
                if (err)
                    reject(err);
                else
                    resolve(res);
            });
    });
}
 

//We will return json from this function with all the required things
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
        include_rts : false,
		tweet_mode: 'extended'
    };

    var trimTop5Likes = [];
	var trimTop5Retweets = [];

    var t = tweetsByUser(t, params);

    t.then(function(tweets){
        var tweetText = "";
        var likesTotal = 0;
        var reTweetsTotal = 0;
        for(var i = 0; i < tweets.length; i++){
            tweetText = tweetText + " " + tweets[i].text;
            likesTotal += tweets[i].favorite_count;
            reTweetsTotal += tweets[i].retweet_count;
        }
        
        const defaultParameters = {
			'textToAnalyze': tweetText,
			'username':      '490dc133-beae-49c1-8e30-31a3f809261b',
			'password':      'cyrRye4xUTjz',
			'url' : 'https://gateway.watsonplatform.net/personality-insights/api',
			'use_unauthenticated' : true
		}
        console.log("Running Watson: ");

		if (require.main === module){
            watson(defaultParameters)
            .then((results) => console.log(JSON.stringify(results, null, 2)))
            .catch((error) => console.log(error.message));
        }	

        var likesAverage = likesTotal/tweets.length;
        var retweetsAverage = reTweetsTotal/tweets.length;
        //console.log(likesAverage);
        //console.log(retweetsAverage);
        
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
        
        for(var i = sortedByLikes.length - 1; i >= sortedByLikes.length - 5; i--){
            trimTop5Likes.push((sortedByLikes[i])[0]);
        }
        for(var i = sortedByRetweets.length - 1; i >= sortedByRetweets.length - 5; i--){
            trimTop5Retweets.push((sortedByRetweets[i])[0]);
        }
		
		var returnData = {}
		
		returnData["LikesArray"] = trimTop5Likes;
		returnData["RetweetsArray"] = trimTop5Retweets;
		returnData["AverageLikes"] = likesAverage;
		returnData["AverageRetweets"] = retweetsAverage;
		
        return returnData;

    }).then(function(data){
        //Now can work with trimtop5likes, since its in data
        var top5LikesIDs = "";
        for(var i = 0; i < data["LikesArray"].length; i++){
            top5LikesIDs = top5LikesIDs + (data["LikesArray"])[i] + ",";
        }
        top5LikesIDs = top5LikesIDs.slice(0, -1);


		var top5RetweetsIDs = "";
        for(var i = 0; i < data["RetweetsArray"].length; i++){
            top5RetweetsIDs = top5RetweetsIDs + (data["RetweetsArray"])[i] + ",";
        }
		top5RetweetsIDs = top5RetweetsIDs.slice(0, -1);

    }).catch(function(err){
        console.log("err: " + err);
    });
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