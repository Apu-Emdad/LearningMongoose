const { MongoClient } = require("mongodb");

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.1ikru.mongodb.net/Mongoose?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

exports.test = client.db("Mongoose");
exports.mongooseCollection = this.test.collection("mongoose");
exports.uri = uri;
exports.client = client;
