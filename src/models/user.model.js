const mongoose = require('mongoose');
// eslint-disable-next-line import/no-extraneous-dependencies
const passportLocalMongoose = require('passport-local-mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({

	email: {
		type: String,
		required: true,
		unique: true
	}

});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', userSchema);

module.exports = User;
