var mongoose = require("mongoose");

var User = new mongoose.Schema({
	_id: String,
	email: String,
	password: String
});

module.exports = mongoose.model("user", User);