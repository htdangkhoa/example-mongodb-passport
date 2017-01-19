//Declare modules.
var config = require("./config");
var User = require("./models/user");
var mongoose = require("mongoose");
var passport = require("./passport/index").passport;
var cookieParser = require("cookie-parser");
var	bodyParser = require("body-parser");
var	expressSession = require("express-session");
var express = require("express");
var app = express();
var port = process.env.PORT || 5000;

//Connect to mongoDB.
mongoose.connect(config.url);

//Set engine template.
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.engine("html", require("ejs").renderFile);

//Setup cookie parser, body parser and express session.
app.use(cookieParser());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(expressSession({
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: false
}));

//Setup passport initialize function and passport session function.
app.use(passport.initialize());
app.use(passport.session());

//Setup routes.
app.use("/", require("./routes/api"));

//Start server.
app.listen(port, function(){
	console.log("Connect.");
})
