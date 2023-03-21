const cartService=require("../../services/products/CartService")
const products= require("../../database/models/product")
const getAllProducts=require("../../controllers/products/getAllProducts")




const saveproduct=async function(req, res)
{
  
  const user = req.session.user;
  const id = req.body.id;


  const item  = await products.findOne({_id:id});
  const cart ={
    id:item._id,
    Name: item.Name,
    pic: item.pic,
    price: item.price,
    user:user.fullname,
    qty:1
  }

  try
  {
   await cartService.savecart(cart);
    console.log("add to cart done");
    res.json("done")
  }
  catch(err)
  {
    res.json("error aaya re");
  }
  
}
const getproduct=async function(req, res)
{
  
  const user = req.session.user;

  try
  {
    const data = await cartService.getcartproduct(user);
    console.log(data);
    res.render("mycart",{ data: data,  user: user })
  }
  catch(err)
  {
    res.json("error aaya re");
  }
  
}



module.exports = {
    saveproduct,
    getproduct
}

