module.exports = function(app){
	var jsdom = require('jsdom');
	var btoa = require('btoa');
	$ = require('jquery')(new jsdom.JSDOM().window);
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
	    $.ajax({
	    	type: 'GET',
	    	url: 'https://api.github.com/user',
	    	headers:{
	    		'Authorization': "Basic "+btoa(login+":"+password)
	    	},
	    	proccessData: false,
	    	success: function(data){
	    		console.log("Успех");
	    		console.log(data);
	    		response.redirect("/githubLogIn");
	    	},
	    	error: function(error){
	    		//обработка неверного ввода
	    		console.log("УУпс");
	    		console.log(error);
	    		response.sendFile(__dirname+"/github.html");
	    	}
	    });
	});

	app.get("/githubLogIn",function(request,response){
		response.sendFile(__dirname+"/githubLogIn.html");
	});
}