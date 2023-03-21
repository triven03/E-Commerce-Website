const UserModel = require("../../database/models/user");

module.exports = async function(userId)
{
  const user = await UserModel.findOne({ _id: userId });

  if(user)
  {
    console.log(user);
    await UserModel.updateOne({ _id:userId }, { isVerified: true });
    return
  }
  else
  {
     throw new Error("user not found");
  }
}