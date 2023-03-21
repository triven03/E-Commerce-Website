const ProductModel = require("../../database/models/product");

// const ProductModel = require("../database/models/todo");

module.exports = async function()
{
  const data  = await ProductModel.find({});
  return data;
}