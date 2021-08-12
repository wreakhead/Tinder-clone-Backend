const mongoose = require("mongoose");
const { Schema } = require("mongoose");
mongoose.Schema.promise = global.promise;
mongoose.set("useCreateIndex", true);

require("dotenv").config();
const url = process.env.KEY;


const cardData = Schema(
  {
    name: String,
    imgUrl: String,
  },
  { collection: "cardData" }
);

let collection = {};

collection.getTinderData = async () => {
  try {
    let database = await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    let model = await database.model("cardData", cardData);
    return model;
  } catch {
    let error = new Error("connection failed");
    error.status = 500;
    throw error;
  }
};
module.exports = collection;
