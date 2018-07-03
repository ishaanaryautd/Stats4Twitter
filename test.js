async function callAPI(){
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
        count: 500
    };

    var a = await new Promise((resolve, reject) => {
        t.get('statuses/user_timeline', params, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });

    // var a = await t.get('statuses/user_timeline', params, (err, data) => {
    //     if (err) {
    //         console.log("err");
    //     } else {
    //         return data;
    //     }
    //  });

    //processing on a
    console.log(a);

}

callAPI();