const { SHA3 } = require('sha3');
const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');
const publicPath = path.join(__dirname, '/public');
const app = express();
const hash1 = new SHA3(512);
const hash2 = new SHA3(512);
app.use(express.static(publicPath));
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
	//высчитываем хэш введенного пароля
	hash1.update(`${request.body.password}`);
	console.log(hash1.digest('hex'));
	//сравниваем хэш с хэшом пароля admin
	if (`${request.body.login}`=='admin' && hash1.digest('hex')==hash2.update('admin').digest('hex')){
		console.log('Успешно');
		response.redirect("/main");
	}
	else {
		console.log('Упс');
		response.sendFile(__dirname + "/index.html");
	}
	hash1.reset();
	hash2.reset();
});
  
app.get("/", function(request, response){
    response.sendFile(__dirname + "/index.html");
});

//ссылки на другие страницы
require('./main.js')(app);
require('./github.js')(app);
require('./facebook.js')(app);  
require('./odnoclassniki.js')(app);  
require('./instagram.js')(app);  
require('./vk.js')(app);  

app.listen(3000);