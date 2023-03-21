const verifyUserService = require("../../services/user/verifyUser");

module.exports = async function(req, res)
{
	const userId = req.params.userId

	try
	{
		await verifyUserService(userId);
		const err={code:200,massage:"Your Email Verification Is Success"}

		res.render("login",{error:err});
	}
	catch(err)
	{
		res.json(err);
	}
		

}