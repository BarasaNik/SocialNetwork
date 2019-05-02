module.exports = function(app){

	app.get("/odnoclassniki",function(request,response){
		response.sendFile(__dirname+"/autorOdnoclass.html");
	});

	app.post("/odnoclassniki", function (request, response) {
	    response.redirect('https://connect.ok.ru/oauth/authorize?client_id=1278141696&scope=VALUABLE_ACCESS&response_type=code&redirect_uri=http://localhost:3000/blank&layout=w');
	});

	app.get("/blank",function(request,response){
		response.sendFile(__dirname+"/blank.html");
	});
}