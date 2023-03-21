const UserModel = require("../../database/models/user");
const mail = require("../../utils/sendMail");


module.exports = async function(user)
{
  const updatedUser = await UserModel.create(user);

  const result = await mail.sendMail( 
    [{
      Email: user.email,
      Name: user.username
    }], 
    "Verify your E commerce Account ", 
    `<h1>verify yourself sir / mam</h1>
      <a href="http://localhost:3000/validateEmail/${updatedUser.id}">Click here</a>
    `
  );

  return;
}