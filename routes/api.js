//Declare modules.
var User = require("../models/user");
var passport = require("../passport/index").passport;
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
		email: req.body.email,
		password: req.body.password
	});
	
	user.save(function(err, result){
		if (err){
			if (err.code == 11000) {
				res.send("Email already exist.");
			}

			res.send(err.errmsg);
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