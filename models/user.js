//Declare modules.
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt = require("bcrypt");
var salt_rounds = 10;

//Create new schema.
var User = new Schema({
	_id: {
		type: String,
		default: new mongoose.Types.ObjectId()
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true	
	}
});

//Hash password before insert to schema.
User.pre('save', function(next) {
    var user = this;

    //Only hash the password if it has been modified (or is new).
    if (!user.isModified('password')) {
    	return next();
    }

    //Generate a salt.
    bcrypt.genSalt(salt_rounds, function(err, salt) {
        if (err) return next(err);

        //Hash the password using our new salt.
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            console.log(hash)
            //Override the cleartext password with the hashed one.
            user.password = hash;
            next();
        });
    });
});

User.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

//Export modules.
module.exports = mongoose.model("user", User);