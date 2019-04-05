module.exports = function(app){
	app.get("/odnoclassniki",function(request,response){
		response.sendFile(__dirname+"/autorOdnoclass.html");
	});
}