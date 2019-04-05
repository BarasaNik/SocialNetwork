module.exports = function(app){
	app.get("/main",function(request,response){
		response.sendFile(__dirname+"/main.html");
	});
}