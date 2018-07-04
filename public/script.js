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
		},
		error: function() {
			console.log("Something went wrong, data could not be fetched");
		}
	});
}