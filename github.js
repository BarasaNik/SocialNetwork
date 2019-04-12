module.exports = function(app){
	app.get("/github",function(request,response){
		response.sendFile(__dirname+"/github.html");
	});
}