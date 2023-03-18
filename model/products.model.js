const { Schema, model } = require("mongoose");

const products_Schema = new Schema({
  title: String,
  price: Number,
  description: String,
  category: String,
  image: String,
  rating: {
    rate: Number,
    count: Number,
  },
});

const products_Model = model("product", products_Schema);

module.exports = products_Model;

