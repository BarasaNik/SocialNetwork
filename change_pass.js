module.exports = function(app){
	var jsdom = require('jsdom'),
		btoa = require('btoa'),
		fs = require('fs'),
		DomParser = require('dom-parser'),
		parser = new DomParser();
	$ = require('jquery')(new jsdom.JSDOM().window);
	const bodyParser = require("body-parser");
	const urlencodedParser = bodyParser.urlencoded({extended: false});
	var UserData=null;
	var errorLog=false;
	var UserLogin=null;
	var UserPassword=null;

	app.get("/change",function(request,response){
		
	});

	app.post("/change", urlencodedParser, function (request, response) {
	    if(!request.body) return response.sendStatus(400);
	    console.log(request.body);
	});
}