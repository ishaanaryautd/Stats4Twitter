function fetchData(){
	$.ajax({
		url: "/data" ,
		data: {
			"twitterUsername": document.getElementById("username").value
		},
		method: "GET",
		dataType: "json",
		success: function(result) {
			console.log(result);
			document.getElementById("like1").innerHTML = result.Top5LikedTweets[4].tweet;
			document.getElementById("like2").innerHTML = result.Top5LikedTweets[3].tweet;
			document.getElementById("like3").innerHTML = result.Top5LikedTweets[2].tweet;
			document.getElementById("like4").innerHTML = result.Top5LikedTweets[1].tweet;
			document.getElementById("like5").innerHTML = result.Top5LikedTweets[0].tweet;
			document.getElementById("retweet1").innerHTML = result.Top5RetweetedTweets[4].tweet;
			document.getElementById("retweet2").innerHTML = result.Top5RetweetedTweets[3].tweet;
			document.getElementById("retweet3").innerHTML = result.Top5RetweetedTweets[2].tweet;
			document.getElementById("retweet4").innerHTML = result.Top5RetweetedTweets[1].tweet;
			document.getElementById("retweet5").innerHTML = result.Top5RetweetedTweets[0].tweet; 
		},
		error: function() {
			console.log("Something went wrong, data could not be fetched");
		}
	});
}