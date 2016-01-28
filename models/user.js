var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema

/* the user schema atributes / characteristics / fields */
var userSchema = new Schema({
	email: { type: String, unique: true, lowercase: true},
	password: {type: String},
	
	profile: {
		name: { type: String},
		picture: { type: String}
	},
	
	address: { type: String},
	history: [{
		date: { type: Date},
		paid: { type: Number}
//		item: { type: Schema.Types.ObjectId,}
	}]
});

/* Hash the password before we even save it to the database   */

userSchema.pre('save', function(next){
	var user = this;
	if (!user.isModified('password')) return next();
	bcrypt.genSalt(10, function(err, salt){
		if (err) return next(err);
		bcrypt.hash(user.password, salt, null, function(err, hash){
			if (err) return next(err);
			user.password = hash;
			next();
		});
	});
});

/* compare password in the database and the one that the user typed in  */

userSchema.methods.comparePassword = function(password) {
	return bcrypt.compareSync(password, this.password);
}