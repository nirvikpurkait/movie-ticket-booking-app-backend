const User = require("../schemas/User");

const userExists = async (query) => {
	let exists = false;
	const user = await User.findOne(query);
	if (user) {
		exists = true;
	}
	return exists;
};

const addUser = async (userDetails) => {
	const user = await User.create(userDetails);
	await user.save();
	console.log(user);
};

const findUser = async (query) => {
	const user = await User.findOne(query);
	return user;
};

module.exports = { userExists, addUser, findUser };
