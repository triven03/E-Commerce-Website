// const getAllProducts = require("../services/products/getAllProducts");
const { Message } = require("node-mailjet");
const getAllProducts = require("../../services/products/getAllProducts");

module.exports = async function(req, res)
{
  if(!req.session.isLoggedIn)
  {
    res.redirect("/login");
    return
  }

  const user = req.session.user;


  try
  {
    const data = await getAllProducts();
    res.render("home",{ data: data,  user: user })
  }
  catch(err)
  {
    res.json("error aaya re");
  }
  
}