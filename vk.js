module.exports = function(app){
	app.get("/vk",function(request,response){
		response.sendFile(__dirname+"/vk.html");
	});
}