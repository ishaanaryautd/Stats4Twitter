require('dotenv').config();

function callTwitterAPI(){
    var Twitter = require('twitter');
    var t = new Twitter({
        consumer_key: process.env.twitter_consumer_key,
        consumer_secret: process.env.twitter_consumer_secret,
        access_token_key: process.env.twitter_access_token_key,
        access_token_secret: process.env.twitter_access_token_secret
    });

    var params = {
        screen_name : "iamsrk",
        include_rts : false,
        tweet_mode: 'extended',
        count: 5
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

function watson(params) {
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

async function callingAPIFunction(){
    console.log("calling callAPI()");
    var a = await callTwitterAPI();

    var tweetText = "";
    var likesTotal = 0;
    var reTweetsTotal = 0;
    //final data to return
    var return_data = {};



    for(var i = 0; i < a.length; i++){
        tweetText = tweetText + " " + a[i].full_text;
        likesTotal += a[i].favorite_count;
        reTweetsTotal += a[i].retweet_count;
    }
    //5 tweets text is here
    //console.log(tweetText);
    //add a random val from twitter object to return
    return_data["tweetText"] = tweetText;

    const defaultParameters = {
        'textToAnalyze': tweetText,
        "url": "https://gateway.watsonplatform.net/personality-insights/api",
        "username": "6f5ec39d-de4b-4098-af90-01c011a8ac8d",
        "password": "U5hNHR12tzbm",
        'use_unauthenticated' : false
    }

    var b = await watson(defaultParameters);
   
    //add a random val from watson obj to return
    return_data["word_count"] = b.word_count_message;

    return return_data;
    
}

callingAPIFunction().then(function(data){
    console.log(data);
}).catch(function(err){
    console.log(err);
});
