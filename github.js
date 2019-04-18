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
	/*
	* Для главной страницы GitHub
	*/
	app.get("/github",function(request,response){
		if(errorLog==false) 
			response.sendFile(__dirname+"/github.html");
		else{
			fs.readFile('github.html', 'utf8', function(err, html){
			  if (!err){
			    var dom = parser.parseFromString(html).rawHTML;
			    //вывод сообщения о неверном логине/пароле
			    response.send(dom.replace('<p></p>','<p></p>\n\t<div class=\"error\">Неверный логин/пароль</div>\n</body>\n</html>'));
			  }
			});
		}
	});

	/*
	* Для главной страницы GitHub
	*/
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
	    		UserData=data;
	    		console.log("Успех");
	    		console.log(data);
	    		response.redirect("/githubLogIn");
	    	},
	    	error: function(error){
	    		//обработка неверного ввода
	    		console.log(error);
	    		errorLog=true;
	    		response.redirect("/github");
	    	}
	    });
	});

	/*
	* Для страницы авторизации GitHub
	*/
	app.get("/githubLogIn",function(request,response){
		fs.readFile('githubLogIn.html', 'utf8', function(err, html){
			if (!err){
			var dom = parser.parseFromString(html).rawHTML;
			var changeName=dom.replace('<span id="username">','<span id="username">'+UserData.login);
			var changeIcon=changeName.replace('img src=""','img src="'+UserData.avatar_url+'"');
			//вывод сообщения о неверном логине/пароле
			response.send(changeIcon);
			}
		});
	});

	/*
	* Для репозиториев GitHub
	*/
	app.get("/github/repositories",function(request,response){

		/*fs.readFile('githubLogIn.html', 'utf8', function(err, html){
			if (!err){
			var dom = parser.parseFromString(html).rawHTML;
			var changeName=dom.replace('<span id="username">','<span id="username">'+request.query.name);
			var changeIcon=changeName.replace('img src=""','img src="'+request.query.icon+'"');
			//вывод сообщения о неверном логине/пароле
			response.send(changeIcon);
			}
		});*/
	});
}