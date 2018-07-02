function testFunction(){
	
	//lol = JSON.stringify(lol);
	$.ajax({
		url: "http://localhost:8080/data" ,
		data: {
			"ishaan": "ish",
			"shlok": "shl"
		},
		method: "GET",
		dataType: "json",
		success: function(result) {
			console.log("success");
			document.getElementById("afterText").innerHTML = result.ishaan + result.shlok;
		},
		error: function() {
			console.log("Something went wrong, data could not be fetched");
		}
	});
}