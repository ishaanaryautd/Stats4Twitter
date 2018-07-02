function testFunction(){
	
	//lol = JSON.stringify(lol);
	$.ajax({
		url: "http://localhost:8080/data" ,
		data: {
			"ishaan": "1",
			"shlok": "2"
		},
		method: "GET",
		dataType: "json",
		success: function(result) {
			console.log("success");
		},
		error: function() {
			console.log("Something went wrong, data could not be fetched");
		}
	});
}