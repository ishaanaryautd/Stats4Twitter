$("#username").keyup(function (event) {
	if (event.keyCode == 13) {
		$("#submit").click();
	}
})

// $('.alert').on('closed.bs.alert', function (e) {
// 	//e.preventDefault();
// 	$('.alert').hide();
// 	window.location.reload();
// })

$("body").on("click", ".alert", function (e) {
	$("#alert").hide();
});

$("#submit").click(function (e) {
	// if (document.getElementById("alert").style.display == "block") {
	// 	$("#alert").css('display', 'none');
	// }
	e.preventDefault();
	if (document.getElementById("username").value == "") {
		let element = document.getElementById("alertText");
		element.innerHTML = "The username field cannot be empty.";
		//$("#alert").css('display', 'block');
		$("#alert").show();
	}
	else {
		var has5tweets = "no";

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
				if ((Object.keys(result).length == 0) || (result.hasOwnProperty("errors"))) {

					let element = document.getElementById("alertText");
					element.innerHTML = "Either the user does not exist, or does not have any tweets.";
					$("#alert").show();
					$("#tryAgain").css('display', 'block');
					$("#loading").hide();
					$("#chart_div").css('display', 'none');
				}
				else {
					console.log("here");
					var url = result.ProfilePic;
					url = url.replace("_normal", "");
					document.getElementById("profPic").src = url;
					document.getElementById("name").innerHTML = result.Name;
					document.getElementById("profScreenName").innerHTML = "(@" + result.ScreenName + ")";
					document.getElementById("avgLikes").innerHTML = Math.round(result.AverageLikes) + " likes";
					document.getElementById("avgRetweets").innerHTML = Math.round(result.AverageRetweets) + " retweets";
					document.getElementById("followers").innerHTML = result.Followers;
					document.getElementById("following").innerHTML = result.Following;

					if (result.Top5LikedTweets.length == 5) {
						document.getElementById("like1").innerHTML = result.Top5LikedTweets[0].tweet;
						document.getElementById("like2").innerHTML = result.Top5LikedTweets[1].tweet;
						document.getElementById("like3").innerHTML = result.Top5LikedTweets[2].tweet;
						document.getElementById("like4").innerHTML = result.Top5LikedTweets[3].tweet;
						document.getElementById("like5").innerHTML = result.Top5LikedTweets[4].tweet;
						document.getElementById("numlikes1").innerHTML = result.Top5LikedTweets[0].likes;
						document.getElementById("numlikes2").innerHTML = result.Top5LikedTweets[1].likes;
						document.getElementById("numlikes3").innerHTML = result.Top5LikedTweets[2].likes;
						document.getElementById("numlikes4").innerHTML = result.Top5LikedTweets[3].likes;
						document.getElementById("numlikes5").innerHTML = result.Top5LikedTweets[4].likes;

						if (result.Top5LikedTweets[0].imageURL != null)
							document.getElementById("piclikes1").src = result.Top5LikedTweets[0].imageURL;
						else {
							var elem = document.getElementById('piclikes1');
							elem.parentNode.removeChild(elem);
						}
						if (result.Top5LikedTweets[1].imageURL != null)
							document.getElementById("piclikes2").src = result.Top5LikedTweets[1].imageURL;
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
						if (result.Top5LikedTweets[3].imageURL != null)
							document.getElementById("piclikes4").src = result.Top5LikedTweets[3].imageURL;
						else {
							var elem = document.getElementById('piclikes4');
							elem.parentNode.removeChild(elem);
						}
						if (result.Top5LikedTweets[4].imageURL != null)
							document.getElementById("piclikes5").src = result.Top5LikedTweets[4].imageURL;
						else {
							var elem = document.getElementById('piclikes5');
							elem.parentNode.removeChild(elem);
						}

						document.getElementById("retweet1").innerHTML = result.Top5RetweetedTweets[0].tweet;
						document.getElementById("retweet2").innerHTML = result.Top5RetweetedTweets[1].tweet;
						document.getElementById("retweet3").innerHTML = result.Top5RetweetedTweets[2].tweet;
						document.getElementById("retweet4").innerHTML = result.Top5RetweetedTweets[3].tweet;
						document.getElementById("retweet5").innerHTML = result.Top5RetweetedTweets[4].tweet;
						document.getElementById("numretweets1").innerHTML = result.Top5RetweetedTweets[0].retweets;
						document.getElementById("numretweets2").innerHTML = result.Top5RetweetedTweets[1].retweets;
						document.getElementById("numretweets3").innerHTML = result.Top5RetweetedTweets[2].retweets;
						document.getElementById("numretweets4").innerHTML = result.Top5RetweetedTweets[3].retweets;
						document.getElementById("numretweets5").innerHTML = result.Top5RetweetedTweets[4].retweets;



						if (result.Top5RetweetedTweets[0].imageURL != null) {
							document.getElementById("picretweets1").src = result.Top5RetweetedTweets[0].imageURL;
						}
						else {
							var elem = document.getElementById('picretweets1');
							elem.parentNode.removeChild(elem);
						}
						if (result.Top5RetweetedTweets[1].imageURL != null)
							document.getElementById("picretweets2").src = result.Top5RetweetedTweets[1].imageURL;
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
						if (result.Top5RetweetedTweets[3].imageURL != null)
							document.getElementById("picretweets4").src = result.Top5RetweetedTweets[3].imageURL;
						else {
							var elem = document.getElementById('picretweets4');
							elem.parentNode.removeChild(elem);
						}
						if (result.Top5RetweetedTweets[4].imageURL != null)
							document.getElementById("picretweets5").src = result.Top5RetweetedTweets[4].imageURL;
						else {
							var elem = document.getElementById('picretweets5');
							elem.parentNode.removeChild(elem);
						}
						has5tweets = "yes";
					}
					else {
						//less than 5 tweets 
					}

					if (result.hasOwnProperty('Openness')) {
						google.charts.load('current', { packages: ['corechart', 'bar'] });
						google.charts.setOnLoadCallback(drawBasic);

						function drawBasic() {
							var data = google.visualization.arrayToDataTable([
								['Personality', 'Percentage', { role: 'style' }],
								['Openness', result.Openness * 100, '#1AA6D9'],            // RGB value
								['Conscientiousness', result.Conscientiousness * 100, '#1AA6D9'],
								['Extraversion', result.Extraversion * 100, '#1AA6D9'],
								['Agreeableness', result.Agreeableness * 100, 'color: #1AA6D9'],
								['Emotional range', result["Emotional range"] * 100, 'color: #1AA6D9'] // CSS-style declaration
							]);

							var options = {
								hAxis: {
									title: 'Personality Trait',
									viewWindow: {
										min: [7, 30, 0],
										max: [17, 30, 0]
									},
								},
								vAxis: {
									title: 'Percentage'
								},
								legend: {
									position: 'none'
								}
							}

							var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
							chart.draw(data, options);
						}
						$("#ibmHeader").css('display', 'block');
						$(window).resize(function () {
							drawBasic();
						});
						if (has5tweets == "no") {
							$("#alert").css('display', 'block');
							let element = document.getElementById("alert");
							element.insertAdjacentHTML('afterbegin', "The number of the user's tweets does not meet the minimum required to show the Top 5 tweets.");
							//Put what u like to convey to user that cant show top 5 tweets but WE CAN show personality insights 
						}
					}
					else {
						document.getElementById("chart_div").style.display = "none";
						$("#alert").css('display', 'block');

						if (has5tweets == "yes") {
							let element = document.getElementById("alert");
							element.insertAdjacentHTML('afterbegin', "The number of the user's tweets does not meet the minimum required by IBM Watson's Personality Insights.");
							//Put what u like to convey to user that WE CAN show top 5 tweets but we cant show personality insights
						}
						else {
							let element = document.getElementById("alert");
							element.insertAdjacentHTML('afterbegin', "The number of the user's tweets does not meet the minimum requirement to show the Top 5 Tweets, nor IBM Watson's Personality Insights.");
							//Put what u like to convey to user that we cant show top 5 or personality insights. cant show either
						}
					}

					$("#loading").hide();

					if (has5tweets == "yes") {
						$('#likedTweets').css('display', 'block');
						$('#retweetedTweets').css('display', 'block');
					}
					$("#avgLR").css('display', 'block');
					$("#followCount").css('display', 'block');
					$("#tryAgain").css('display', 'block');
					$("#profile").css('display', 'block');


				}
			},
			error: function () {
				console.log("Something went wrong, data could not be fetched ");
			}
		});
	}
})
