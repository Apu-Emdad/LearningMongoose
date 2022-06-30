const express = require("express");
const { MongoClient } = require("mongodb");
require("dotenv").config();
const cors = require("cors");
const ObjectId = require("mongodb").ObjectId;
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
const mongoose = require("mongoose");

const config = require("./config");
const CatModel = require("./Model/Cat");

const uri = config.uri;
const client = config.client;
const mongooseCollection = config.mongooseCollection;

async function run() {
  try {
    // await client.connect();
    // console.log("found client");

    await mongoose.connect(uri);
    console.log("mongoose connected");

    const catDetail = {
      name: "Gray Cat",
      color: "Gray",
      food: ["Fish", "Chicken"],
      age: 5,
      active: true,

      bestFriend: new ObjectId(),
      Owner: {
        name: "Gifari",
        id: mongoose.Types.ObjectId(),
      },
    };

    //calling the scheam to validate "catDetail"
    /*  const cat = new CatModel(catDetail);
    console.log(cat); */

    // you can filter,create, update, sort,delete by the MongoDB functions. you can also put complex filter expressions
    /*    const cat = await CatModel.findById("62b8d07959d207485a02b87b");
    const cat = await CatModel.find({ name: "Mahir" });
    const cat = await CatModel.exists({ name: "Mahi" });
       const cat = await CatModel.find({
      name: "Gray cat",
      color: "Gray",
      age: { $gte: 4 },
    }); */

    //deleting
    /*   const cat = await CatModel.deleteOne({ name: "Mahir" }); 
    const testResult = await mongooseCollection.deleteMany({});
    console.log(testResult); */

    //saving the data to database. errors will be handled in this block
    // const result = await cat.save();

    // calling via instance method. In this method you have to create a prototype declaring new _model_() inside a variable. After that you have to access the function by object chaining
    app.get("/instance", async (req, res) => {
      const cat = new CatModel();
      const result = await cat.findYellowCat();
      res.send(result);
    });

    // calling via static method. This is a static mehtod similar as static in class. you can simply call the class name i.e. _model_ and access the function via object chaining
    app.get("/static", async (req, res) => {
      const result = await CatModel.findWhiteCat();
      res.send(result);
    });

    // This is custom qurey helper. as you can see find() is a built in query, we can nest it by custom query.
    app.get("/query", async (req, res) => {
      const result = await CatModel.find().findCat("orange");
      res.send(result);
    });

    //calling via query helpers
  } catch (e) {
    console.log(e.message);
  } finally {
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("hello from my first ever node");
});

app.listen(port, () => {
  console.log("listening to port", port);
});
