const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductSchema = new Schema({
  Name: String,
  Disc: String,
  pic: String,
  price: String
});

const ProductModel = new mongoose.model("product", ProductSchema);

module.exports = ProductModel;
