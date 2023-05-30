require("dotenv").config();
const app = require("./app");
const connectDB = require("./database/connecDB");

const port = process.env.PORT;

connectDB().then(() => {
	app.listen(port, () => {
		console.log(`App running on port ${port}`);
	});
});
