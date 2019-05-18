function DataBase() {
    this.MongoClient = require("mongodb").MongoClient;
    this.url = process.env.MONGO_URL || 'mongodb://localhost:27017/';
    mongoClient = new MongoClient(url, { useNewUrlParser: true });
}

function dataBaseConnect() {

}