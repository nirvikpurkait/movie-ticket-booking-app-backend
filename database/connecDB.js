const mongoose = require("mongoose");

const connectDB = async () => {
	await mongoose.connect(
		"mongodb+srv://nirvik:A9789PuA5AAuLh5b@cluster0.908dezy.mongodb.net/movie-booking-app"
	);
	console.log("DB connected");
};

module.exports = connectDB;
