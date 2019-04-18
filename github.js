module.exports = function(app){
	var jsdom = require('jsdom'),
		btoa = require('btoa'),
		fs = require('fs'),
		DomParser = require('dom-parser'),
		parser = new DomParser();
	$ = require('jquery')(new jsdom.JSDOM().window);
	const bodyParser = require("body-parser");
	const urlencodedParser = bodyParser.urlencoded({extended: false});
	
	app.get("/github",function(request,response){
		if(request.query.mes==undefined) 
			response.sendFile(__dirname+"/github.html");
		else{
			console.log(request.query.mes);
			fs.readFile('github.html', 'utf8', function(err, html){
			  if (!err){
			    var dom = parser.parseFromString(html).rawHTML;
			    //вывод сообщения о неверном логине/пароле
			    response.send(dom.replace('<p></p>','<p></p>\n\t<div class=\"error\">Неверный логин/пароль</div>\n</body>\n</html>'));
			  }
			});
		}
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
	    		response.redirect("/githubLogIn?name="+data.login+"&icon="+data.avatar_url);
	    	},
	    	error: function(error){
	    		//обработка неверного ввода
	    		console.log(error);
	    		response.redirect("/github?mes='Неверный логин/пароль'");
	    	}
	    });
	});

	app.get("/githubLogIn",function(request,response){
		fs.readFile('githubLogIn.html', 'utf8', function(err, html){
			if (!err){
			var dom = parser.parseFromString(html).rawHTML;
			var changeName=dom.replace('<span id="username">','<span id="username">'+request.query.name);
			var changeIcon=changeName.replace('img src=""','img src="'+request.query.icon+'"');
			//вывод сообщения о неверном логине/пароле
			response.send(changeIcon);
			}
		});
	});
}