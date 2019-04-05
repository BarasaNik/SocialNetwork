module.exports = function(app){
	app.get("/twitter",function(request,response){
		response.sendFile(__dirname+"/twitter.html");
	}); 
}