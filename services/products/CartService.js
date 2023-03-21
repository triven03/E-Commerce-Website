const cart=require("../../database/models/cart")

const getcartproduct= async function(user)
{
  const data  = await cart.find({});
  const userCart = data.filter(function(pr)
  {
    return pr.user === user.fullname;
  })
  
  console.log(userCart);
  return userCart;
}
const savecart= async function(item)
{
  
    await cart.create(item);
    console.log("savecart done");
    return
   
  
  
}

module.exports ={
    getcartproduct,
    savecart
}