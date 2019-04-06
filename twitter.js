module.exports = function(app){
	app.get("/twitter",function(request,response){
		response.sendFile(__dirname+"/twitter.html");
	}); 
	app.post("/twitter",function(request,response){
		if(!request.body) return response.sendStatus(400);
	});
}