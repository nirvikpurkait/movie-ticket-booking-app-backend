const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {
	userExists,
	addUser,
	findUser,
} = require("../database/actions/user-actions");

const checkUserExistToDB = (req, res, next) => {
	const { name } = req.body;
	userExists({ name }).then((data) => {
		if (data) {
			res.body = {
				message: `User already exists`,
			};
			next(new Error(`User already exists`));
		} else {
			next();
		}
	});
};

const addUserToDB = (req, res, next) => {
	const { name, password } = req.body;
	addUser({ name, password }).then(() => {
		next();
	});
};

const encodePassword = (req, res, next) => {
	const { password } = req.body;
	const encodingRound = Number(process.env.ENCODING_ROUND);
	bcrypt.hash(password, encodingRound, (err, hash) => {
		if (err) {
			console.log(err.message);
		} else {
			req.body.password = hash;
			res.status(200);
			res.body = {
				messaage: `User created`,
			};
		}
		next();
	});
};

const findUserFromDB = (req, res, next) => {
	const { name } = req.body;
	findUser({ name }).then((data) => {
		req.body.hash = data.password;
		next();
	});
};

const checkPassword = (req, res, next) => {
	const { password, hash } = req.body;
	bcrypt.compare(password, hash, (err, result) => {
		if (err) {
			next(new Error(`Provide correct passwor`));
		} else {
			next();
		}
	});
};

const addToken = (req, res, next) => {
	const { name } = req.body;
	const tokenKey = process.env.TOKEN_KEY;
	const token = jwt.sign({ name }, tokenKey);
	res.body = {
		token,
	};
	next();
};

module.exports = {
	checkUserExistToDB,
	addUserToDB,
	encodePassword,
	findUserFromDB,
	checkPassword,
	addToken,
};
