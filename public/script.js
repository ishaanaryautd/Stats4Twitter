$("#submit").click(function (e) {
	e.preventDefault();
	document.getElementById("usernameForm").style.display = "none";
	$("#loading").show();
	$.ajax({
		url: "/data",
		data: {
			"twitterUsername": document.getElementById("username").value
		},
		method: "GET",
		dataType: "json",
		success: function (result) {
			console.log(result);
			document.getElementById("like1").innerHTML = result.Top5LikedTweets[4].tweet;
			document.getElementById("like2").innerHTML = result.Top5LikedTweets[3].tweet;
			document.getElementById("like3").innerHTML = result.Top5LikedTweets[2].tweet;
			document.getElementById("like4").innerHTML = result.Top5LikedTweets[1].tweet;
			document.getElementById("like5").innerHTML = result.Top5LikedTweets[0].tweet;
			document.getElementById("numlikes1").innerHTML = result.Top5LikedTweets[4].likes;
			document.getElementById("numlikes2").innerHTML = result.Top5LikedTweets[3].likes;
			document.getElementById("numlikes3").innerHTML = result.Top5LikedTweets[2].likes;
			document.getElementById("numlikes4").innerHTML = result.Top5LikedTweets[1].likes;
			document.getElementById("numlikes5").innerHTML = result.Top5LikedTweets[0].likes;
			if (result.Top5LikedTweets[4].imageURL != null)
				document.getElementById("piclikes1").src = result.Top5LikedTweets[4].imageURL;
			else {
				var elem = document.getElementById('piclikes1');
				elem.parentNode.removeChild(elem);
			}
			if (result.Top5LikedTweets[3].imageURL != null)
				document.getElementById("piclikes2").src = result.Top5LikedTweets[3].imageURL;
			else {
				var elem = document.getElementById('piclikes2');
				elem.parentNode.removeChild(elem);
			}
			if (result.Top5LikedTweets[2].imageURL != null)
				document.getElementById("piclikes3").src = result.Top5LikedTweets[2].imageURL;
			else {
				var elem = document.getElementById('piclikes3');
				elem.parentNode.removeChild(elem);
			}
			if (result.Top5LikedTweets[1].imageURL != null)
				document.getElementById("piclikes4").src = result.Top5LikedTweets[1].imageURL;
			else {
				var elem = document.getElementById('piclikes4');
				elem.parentNode.removeChild(elem);
			}
			if (result.Top5LikedTweets[0].imageURL != null)
				document.getElementById("piclikes5").src = result.Top5LikedTweets[0].imageURL;
			else {
				var elem = document.getElementById('piclikes5');
				elem.parentNode.removeChild(elem);
			}
			document.getElementById("retweet1").innerHTML = result.Top5RetweetedTweets[4].tweet;
			document.getElementById("retweet2").innerHTML = result.Top5RetweetedTweets[3].tweet;
			document.getElementById("retweet3").innerHTML = result.Top5RetweetedTweets[2].tweet;
			document.getElementById("retweet4").innerHTML = result.Top5RetweetedTweets[1].tweet;
			document.getElementById("retweet5").innerHTML = result.Top5RetweetedTweets[0].tweet;
			document.getElementById("numretweets1").innerHTML = result.Top5RetweetedTweets[4].retweets;
			document.getElementById("numretweets2").innerHTML = result.Top5RetweetedTweets[3].retweets;
			document.getElementById("numretweets3").innerHTML = result.Top5RetweetedTweets[2].retweets;
			document.getElementById("numretweets4").innerHTML = result.Top5RetweetedTweets[1].retweets;
			document.getElementById("numretweets5").innerHTML = result.Top5RetweetedTweets[0].retweets;
			document.getElementById("avgLikes").innerHTML = result.AverageLikes + " likes";
			document.getElementById("avgRetweets").innerHTML = result.AverageRetweets + " retweets";

			if (result.Top5RetweetedTweets[4].imageURL != null) {
				document.getElementById("picretweets1").src = result.Top5RetweetedTweets[4].imageURL;
			}
			else {
				var elem = document.getElementById('picretweets1');
				elem.parentNode.removeChild(elem);
			}
			if (result.Top5RetweetedTweets[3].imageURL != null)
				document.getElementById("picretweets2").src = result.Top5RetweetedTweets[3].imageURL;
			else {
				var elem = document.getElementById('picretweets2');
				elem.parentNode.removeChild(elem);
			}
			if (result.Top5RetweetedTweets[2].imageURL != null)
				document.getElementById("picretweets3").src = result.Top5RetweetedTweets[2].imageURL;
			else {
				var elem = document.getElementById('picretweets3');
				elem.parentNode.removeChild(elem);
			}
			if (result.Top5RetweetedTweets[1].imageURL != null)
				document.getElementById("picretweets4").src = result.Top5RetweetedTweets[1].imageURL;
			else {
				var elem = document.getElementById('picretweets4');
				elem.parentNode.removeChild(elem);
			}
			if (result.Top5RetweetedTweets[0].imageURL != null)
				document.getElementById("picretweets5").src = result.Top5RetweetedTweets[0].imageURL;
			else {
				var elem = document.getElementById('picretweets5');
				elem.parentNode.removeChild(elem);
			}
			
			google.charts.load('current', {packages: ['corechart', 'bar']});
			google.charts.setOnLoadCallback(drawBasic);

			
			function drawBasic(){

				var data = google.visualization.arrayToDataTable([
					['Personality', 'Percentage', { role: 'style' }],
					['Openness', result.Openness * 100, '#b87333'],            // RGB value
					['Conscientiousness', result.Conscientiousness * 100, 'silver'],            // English color name
					['Extraversion', result.Extraversion * 100, 'gold'],
					['Agreeableness', result.Agreeableness * 100, 'color: #e5e4e2' ],
					['Emotional range', result["Emotional range"] * 100, 'color: #e5e4e2' ] // CSS-style declaration
				]);

				var options = {
					title: 'Personality Insights from IBM Watson',
					hAxis: {
					  title: 'Personality Trait',
					  viewWindow: {
						min: [7, 30, 0],
						max: [17, 30, 0]
					  }
					},
					vAxis: {
					  title: 'Percentage'
					}
				};

				var chart = new google.visualization.ColumnChart(
				document.getElementById('chart_div'));

				chart.draw(data, options);
			}
			
			$("#loading").hide();
			$('#likedTweets').css('display', 'block');
			$('#retweetedTweets').css('display', 'block');
			$("#avgL").css('display', 'block');
			$("#avgR").css('display', 'block');
			$("#tryAgain").css('display', 'block');
		},
		error: function (err) {
			console.log("Something went wrong, data could not be fetched " + err);
		}
	});
})