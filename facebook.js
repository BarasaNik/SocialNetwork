module.exports = function(app){
	app.get("/facebook",function(request,response){
		response.sendFile(__dirname+"/facebook.html");
	}); 
}