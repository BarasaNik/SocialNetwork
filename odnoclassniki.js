module.exports = function(app){
	
	app.get("/odnoclassniki",function(request,response){
		response.sendFile(__dirname+"/autorOdnoclass.html");
	});

	app.post("/odnoclassniki", function (request, response) {
	    //if(!request.body) return response.sendStatus(400);
	    //console.log(request.body);
	    /*var login = `${request.body.fr_email}`;
	    var password=`${request.body.fr_password}`;
	    console.log(login+' '+password);*/
	    var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
	    var req = new XMLHttpRequest();
	    req.open('POST','https://jsonplaceholder.typicode.com/users', true);
	    req.onload=function(){
	    	if (request.status >= 200 && request.status < 400) 
			 { 
			 var data = JSON.parse(request.responseText); 
			 console.log(data); 
			 } 
			 else 
			 { 
			 console.log("BAD"); 
			 }
	    }
	    xhr = new XMLHttpRequest(); 
		xhr.open('GET', `https://ok.ru/`); 
		xhr.onload = function() { console.log(xhr.responseText);};
	});

	app.get("/blank",function(request,response){
		response.sendFile(__dirname+"/autorOdnoclass.html");
	});
}