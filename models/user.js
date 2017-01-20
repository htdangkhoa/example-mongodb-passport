//Declare modules.
var mongoose = require("mongoose");
var bcrypt = require("bcrypt-nodejs");

//Create new schema.
var User = new mongoose.Schema({
	_id: String,
	email: String,
	password: String
});

//Export modules.
module.exports = mongoose.model("user", User);
module.exports.bcrypt = bcrypt;