const mail = require("../../utils/sendMail");
const UserModel = require("../../database/models/user");


const resetmail = async function(user,otp)
{   


  const result = await mail.sendMail( 
    [{
      Email: user.email,
      Name: user.fullname
    }], 
    "Reset Password ", 
    `<h1>Reset Your Password  ${user.fullname}</h1>
      <a href="http://localhost:3000/resetpas/${otp}">Click here</a>
    `
  );

  return;
}


const   resetpassset = async function (req,res) {
    const otp = req.params.otp

    const user = await UserModel.findOne({ otp: otp });
    

  if(user)
  {
  
    const err={code:200,massage:"Please Enter New Password"}
    res.render('reset',{id:user._id,error:''})
    return
  }
  else
  {
    const err={code:400,massage:"Your Link Is Expired"}
    res.render('reset',{id:'',error:err})
  }
}
const   resetpassword = async function (req,res) {
    const pass =req.body.password;
    const cnfpass= req.body.confpassword;
    const id =req.body.id;

    if (pass===cnfpass) {
     await UserModel.findByIdAndUpdate({_id:id}, {$set:{ password: pass ,otp:''}});
     

     const err={code:200,massage:"Password Change Success"}
     res.render('reset',{id:id,error:err})

        
    } else {
      const err={code:400,massage:"Both Password Not Match "}
     res.render('reset',{id:id,error:err})
        
    }


}
const otp = function(){
	let num="";
	for (let i = 0; i < 4; i++) {
		num+=Math.floor(Math.random()*10);
		
	}
	return num;
}




module.exports={
    resetmail,
    resetpassset,
    resetpassword,
    otp
}