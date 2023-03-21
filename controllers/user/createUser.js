const createUserService = require("../../services/user/createUser");

module.exports = async function(req, res)
{
	const user = {
		fullname: req.body.username,
			userid: req.body.userid,
			password: req.body.password,
			profile_pic: req.file.filename,
			email: req.body.email
	}		

	try
	{
		await createUserService(user);

		res.redirect("/login");
	}
	catch(err)
	{
		console.log(err)
	}
		

}