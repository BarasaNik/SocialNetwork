class DataBase {
    constructor() {
            const MongoClient = require("mongodb").MongoClient;
            const url = process.env.MONGO_URL || 'mongodb://localhost:27017/';
            this.mongoClient = new MongoClient(url, { useNewUrlParser: true });
        }
        /**
         * Метод для поиска в базе данных пользователя с конкретным логином и паролем
         * @param login искомый логин
         * @param password искомый пароль
         * @returns список подходящих пльзователей
         */
    findUserByLogAndPass(collection, login, password) {
            console.log('Начинаем');
            return new Promise(function(resolve, reject) {
                console.log('Вычисляем значение');
                collection.find({ $and: [{ login: login }, { password: password }] }).toArray(function(err, results) {
                    console.log('Значение ' + results);
                    if (err != null)
                        reject(err);
                    else
                        resolve(results);
                });
            });
        }
        /**
         * Метод для поиска в базе данных пользователя с конкретным логином
         * @param login искомый логин
         * @returns список подходящих пльзователей
         */
    findByLog(collection, login) {
        var finds = [];
        collection.find({ $and: [{ login: login }] }).toArray(function(err, results) {
            console.log('Результат ' + results);
            finds = results;
        });
        return finds;
    }
}

module.exports = DataBase;