const mongoose = require("mongoose");

const ownerSchema = new mongoose.Schema({
  owner: String,
  id: mongoose.SchemaTypes.ObjectId,
});

const catSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      uppercase: true,
      minLength: 5,
    },
    color: String,
    food: {
      type: [String],
      required: true,
    },
    age: {
      type: Number,
      min: 1,
      max: 9,
      /*    validate: {
      validator: (v) => v % 2 === 0,
      message: (props) => `Odd cat age ${props.value} `,
    }, */
    },
    active: Boolean,
    createdAt: {
      type: Date,
      default: () => Date("<YYYY-mm-ddTHH:MM:ss>"),
      immutable: true,
    },
    bestFriend: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
    },
    Owner: {
      type: ownerSchema,
      required: true,
    },
  }
  /*  instance method. if declared inside new mongoose.Schema, it should be written in diffent {} block
  {
    methods: {
      findYellowCat: function () {
        return mongoose.model("mongoose").find({ color: "yellow" });
      },
    },
  } */
);

//instance method
catSchema.methods = {
  findYellowCat: function () {
    const yellow = /yellow/i;
    return mongoose.model("mongoose").find({ color: yellow });
  },
};

//static methods. It works like a class. Unlike instance we use this keyword to access the class, in this case , the schema
catSchema.statics = {
  findWhiteCat: function () {
    return this.find({ color: /white/i });
  },
};

//query helpers. this is custom query helper. use example: find().findCat({"orange"})
catSchema.query = {
  findCat: function (color) {
    return this.find({ color: new RegExp(color, "i") });
  },
};

module.exports = mongoose.model("mongoose", catSchema, "mongoose");

/* ==== Learn With Sumit reference ==== */
// instance methods
/* todoSchema.methods = {
  findActive: function () {
    return mongoose.model("Todo").find({ status: "active" });
  }, */

// static methods
/* todoSchema.statics = {
  findByJS: function () {
    return this.find({ title: /js/i });
  },
}; */

// query helpers
/* todoSchema.query = {
  byLanguage: function (language) {
    return this.find({ title: new RegExp(language, "i") }); // new RegExp()
  },
}; */
