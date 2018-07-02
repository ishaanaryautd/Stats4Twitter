function testFunction(){
	lol = {"ishaan": "1", "shlok": "2"};
	lol = JSON.stringify(lol);
	$.ajax({
		url: "/data" ,
		data: lol,
		method: "GET",
		dataType: "json",
		success: function(result) {
			console.log(result)
		},
		error: function() {
			console.log("Something went wrong, data could not be fetched");
		}
	});
}