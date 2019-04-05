const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(express.static(__dirname + '/public'));
// создаем парсер для данных application/x-www-form-urlencoded
const urlencodedParser = bodyParser.urlencoded({extended: false});
//открытие страницы index.html
app.get("/enter",function(request,response){
	response.sendFile(__dirname+"/index.html");
});
app.post("/enter", urlencodedParser, function (request, response) {
    if(!request.body) return response.sendStatus(400);
    console.log(request.body);
	//проверяем правильность введенных данных
	if (`${request.body.login}`=='admin' && `${request.body.password}`=='admin'){
		console.log('Успех');
		response.redirect("/main");
	}
	else {
		console.log('Упс');
		response.sendFile(__dirname + "/index.html");
	}
});
  
app.get("/", function(request, response){
    response.sendFile(__dirname + "/index.html");
});

//ссылки на другие страницы
require('./main.js')(app);
require('./twitter.js')(app);
require('./facebook.js')(app);  
require('./odnoclassniki.js')(app);  
require('./instagram.js')(app);  
require('./vk.js')(app);  

app.listen(3000);