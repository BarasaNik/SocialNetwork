function DataBase() {
    this.MongoClient = require("mongodb").MongoClient;
    this.url = process.env.MONGO_URL || 'mongodb://localhost:27017/';
    mongoClient = new MongoClient(url, { useNewUrlParser: true });
}

/**
 * Метод для поиска в базе данных пользователя с конкретным логином и паролем
 * @param login искомый логин
 * @param password искомый пароль
 * @returns список подходящих пльзователей
 */
function dataBaseFind(login, password) {
    var finds = [];
    collection.find({ $and: [{ login: userLogin }, { "password": userPassword }] }).toArray(function(err, results) {
        finds = results;
    });
    return finds;
}

/**
 * Метод для поиска в базе данных пользователя с конкретным логином
 * @param login искомый логин
 * @returns список подходящих пльзователей
 */
function dataBaseFind(login) {
    var finds = [];
    collection.find({ $and: [{ login: userLogin }] }).toArray(function(err, results) {
        finds = results;
    });
    return finds;
}