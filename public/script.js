function testFunction(){
	$.ajax({
		url: "/data" ,
		data: {
			"twitterUsername": "SrBachchan"
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