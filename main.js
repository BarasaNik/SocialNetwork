module.exports = function(app) {
    const { SHA3 } = require('sha3');
    var jsdom = require('jsdom'),
        fs = require('fs'),
        DomParser = require('dom-parser'),
        parser = new DomParser();
    $ = require('jquery')(new jsdom.JSDOM().window);
    const bodyParser = require("body-parser");
    const urlencodedParser = bodyParser.urlencoded({ extended: false });
    var userId = '';
    const hash1 = new SHA3(512);
    const hash2 = new SHA3(512);
    const hash3 = new SHA3(512);

    const MongoClient = require("mongodb").MongoClient;
    const url = process.env.MONGO_URL || 'mongodb://localhost:27017/'
    const mongoClient = new MongoClient(url, { useNewUrlParser: true });

    app.get("/main", function(request, response) {
        userId = request.query.userId;
        console.log(userId);
        response.sendFile(__dirname + "/main.html");
    });

    app.get("/change", function(request, response) {
        fs.readFile('main.html', 'utf8', function(err, html) {
            if (!err) {
                var dom = parser.parseFromString(html).rawHTML;
                var delcontent = dom.replace('<span>Начните пользоваться социальными сетями прямо сейчас.</span>', '');
                var change = delcontent.replace('<a href="/change" class="change">Изменить пароль</a>', '<a href="/main" class="change">Назад</a>')
                var addcontent = change.replace('<div class="hello">', '<div id="changePass">\n<form action="/change" method="post">\n' +
                    '<p>Старый пароль</p>\n<input name="oldpass" type="password" class="password">\n<p>Повторите старый пароль</p>' +
                    '\n<input name="oldpassagain" type="password" class="password">\n<p>Новый пароль</p>\n' +
                    '<input name="newpass" type="password" class="password">\n<p></p><input name="change" type="submit" value="Изменить" class="button">\n');
                response.send(addcontent);
            }
        });
    });

    app.post("/change", urlencodedParser, function(request, response) {
        if (!request.body) return response.sendStatus(400);
        var oldpass = hash1.update(`${request.body.oldpass}`).digest('hex');
        var oldpassagain = hash2.update(`${request.body.oldpassagain}`).digest('hex');
        var newpass = hash3.update(`${request.body.newpass}`).digest('hex');
        console.log('userID ' + userId);

        mongoClient.connect(function(err, client) {
            const db = client.db("User");
            const collection = db.collection("user");

            collection.find({ $and: [{ "password": oldpass }] }).toArray(function(err, results) {
                if (results.length > 0 && oldpass == oldpassagain) {
                    console.log(results);
                    var userId = results[0]._id;
                    collection.update({ "_id": userId }, { $set: { "password": newpass } });
                    client.close();
                    response.redirect("/main");
                } else {
                    console.log('Упс');
                    client.close();
                    fs.readFile('main.html', 'utf8', function(err, html) {
                        if (!err) {
                            var dom = parser.parseFromString(html).rawHTML;
                            var delcontent = dom.replace('<span>Начните пользоваться социальными сетями прямо сейчас.</span>', '');
                            var change = delcontent.replace('<a href="/change" class="change">Изменить пароль</a>', '<a href="/main" class="change">Назад</a>')
                            var addcontent = change.replace('<div class="hello">', '<div id="changePass">\n<form action="/change" method="post">\n' +
                                '<p>Старый пароль</p>\n<input name="oldpass" type="password" class="password">\n<p>Повторите старый пароль</p>' +
                                '\n<input name="oldpassagain" type="password" class="password">\n<p>Новый пароль</p>\n' +
                                '<input name="newpass" type="password" class="password">\n<p></p><input name="change" type="submit" value="Изменить" class="button">\n');
                            //вывод сообщения о неверном логине/пароле
                            response.send(addcontent.replace('<input name="change"', '\n<div class=\"error\">Неверный логин/пароль</div>\n<input type="submit"'));
                        }
                    });
                }
            });
        });
    });
}