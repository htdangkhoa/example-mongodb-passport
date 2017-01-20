//Declare modules.
var User = require("../models/user");
var passport = require("../passport/index").passport;
var uuid = require("node-uuid");
var express = require("express");
var router = express.Router();

//Go to main page.
router.get("/", function(req, res){
	console.log(req.user)
	res.render("home.html", { user: req.user });
});

//Go to sign up page.
router.get("/signup", function(req, res){
	res.render("signup.html");
})

//Function sign up.
router.post("/signup", function(req, res){
	var user = new User({
		_id: uuid.v4(),
		email: req.body.email,
		password: User.bcrypt.hashSync(req.body.password, User.bcrypt.genSaltSync(8), null)
	});

	user.save(function(err, result){
		if (err){
			console.log(err);
			res.send(err);
		}else {
			console.log(result);
			res.redirect("/")
		}
	})
})

//Go to login page.
router.get("/login", function(req, res){
    if (!req.user){
      res.render("login.html");
    }else{
      res.redirect("/");
    }
});

//Login function.
router.post("/login", passport.authenticate("local", { failureRedirect: '/login' }), function(req, res) {
    res.redirect("/");
});

//Logout function and go to main page.
router.get("/logout", function(req, res){
	req.logout();
	res.redirect("/");
});

//Go to profile page.
router.get("/profile", function(req, res){
	if (!req.user){
		res.redirect("/");
    }else{
		res.render("profile.html", { user: req.user });
    }
});

//Export route.
module.exports = router;