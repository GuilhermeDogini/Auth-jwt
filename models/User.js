const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	name: String,
	email: String,
	password: String,
	telephones: [
		{
			number: Number,
			area_code: Number
		}
	],
	created_at: Date,
	modified_at: Date
});

const User = mongoose.model("User", userSchema);

module.exports = User;