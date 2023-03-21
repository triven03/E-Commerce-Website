const express = require("express")
const fs = require("fs")
const session = require('express-session')
const multer = require('multer')

const port = process.env.PORT || 3000;
const startDb = require("./database/init");
const userModel = require("./database/models/user");
const productmodel = require("./database/models/product");
const cartController = require("./controllers/products/CartController")

const getAllProductsControllers = require("./controllers/products/getAllProducts");
const createUserController = require("./controllers/user/createUser");
const verifyUserController = require("./controllers/user/verifyUser");
const resetpass = require("./services/user/resetpass");


startDb();

const app = express();

app.use(express.static("public"));
app.use(express.static("uploads"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

/* app.use(function(req, res, next)
{
	console.log(req.url);
	next();
}) */

const upload = multer({ dest: 'uploads' })


app.use(session({
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: true,
	cookie: { secure: false }

}))

app.set("view engine", "ejs");
app.set("views", "./views");

app.route("/mycart").post(cartController.saveproduct).get(cartController.getproduct)
app.get("/", getAllProductsControllers);
app.route("/validateEmail/:userId").get(verifyUserController)
app.route("/resetpas/:otp").get(resetpass.resetpassset)
app.post('/resetpas',resetpass.resetpassword)
// app.get("/", Home);

// app.listen(3000, function () {
// 	console.log("server is live")
// })

app.listen(port, () => {
    console.log(`server is start port number ${port}`);
});

app.get("/logout", function (req, res) {
	req.session.destroy();
	res.redirect("/");
})

app.route("/forget").get((req, res) => {
	res.render("forget", { error: "" });
})
.post(async function (req, res) {
		const email=req.body.email
     
		  const user =await userModel.findOne({email:email});
			if (user) {
				const err = {
					status: 200,
					massage: "Email Sent Success"
				}
				const otp = await resetpass.otp();
                     console.log(otp);
				 await userModel.updateOne({email:email},{$set:{otp:otp}})
                 await resetpass.resetmail(user,otp);

				res.render("forget", { error: err });
			}
			else {
				const err = {
					status: 400,
					massage: "Your Email is invalid"
				}
				res.render("forget", { error: err });

			}
		});

	
app.route("/update").get((req, res) => {
	// console.log(req.session.user._id);
	let id = req.session.user._id
	// if(id){

		res.render("update", { error: "", id: id, session: req.session });
	// }
	
		// res.render("update", { error: ""});

	
})
	.post(function (req, res) {
		const pass = req.body.password;
		const cnfpass = req.body.confpassword;
		const id = req.body.id;
		// console.log(req.session);
		console.log(id);
		if (pass === cnfpass) {

			userModel.findByIdAndUpdate({_id:id}, { password: pass },
				function (err, docs) {
					if (err) {
						console.log(err)
					}
					else {
						console.log("Updated User : ", docs);
					}
				});

			res.render("update", { error: 200, id: '' });

		}

		else {

			res.render("update", { error: 400, id: '' });
		}

	});

app.route("/login").get(function (req, res) {
	res.render("login", { error: "" });
})
	.post(function (req, res) {
		getUser(req.body.userid, req.body.password, function (err, user) {
			if (user.length) {
				req.session.isLoggedIn = true;
				req.session.user = user[0];
				
				if(!user[0].isVerified)
			{
				const err={code:400,massage:"Please Verify Your Email"}
				res.render("login",{error:err });
				return
			}

				res.redirect("/")
			}
			else {
				const err={code:400,massage:"User Not Found"}
				res.render("login", { error:err });

			}
		});

	});

/* app.get("/uploads/:id", function(req, res)
{
	res.sendFile(__dirname+"/uploads/"+req.params.id);
}) */

app.route("/signup").get(function (req, res) {
	res.sendFile(__dirname + "/public/html/signup.html")
})
	.post(upload.single("profilePic"), createUserController)



function getUser(userid, password, callback) {
	userModel.find({ userid: userid, password: password })
		.then(function (data) {
			callback(null, data)
		})
		.catch(function (err) {
			callback("user not found");
		})
}

function forgot(email, callback) {
	userModel.find({ email: email })
		.then(function (data) {
			console.log(data);
			callback(null, data)
		})
		.catch(function (err) {
			callback("user not found");
		})
}

//var index =1;

function GetProduct(callback) {

	productmodel.find({}).then(function (products) {
		callback(null, products)
	})
		.catch(function () {
			callback("cant read todos")
		})

}

