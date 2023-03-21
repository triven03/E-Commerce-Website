const mongoose = require('mongoose');
const { Schema } = mongoose;

const CartSchema = new Schema({
    id:String,
    Name: String,
    pic: String,
    price: String,
    user:String,
    qty:Number
  });
  
  const CartModel = new mongoose.model("cart", CartSchema);
  
  module.exports = CartModel;
  