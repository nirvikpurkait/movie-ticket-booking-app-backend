const express = require("express");

const userController = require("../controllers/user-cont");
const {
	checkUserExistToDB,
	addUserToDB,
	encodePassword,
	findUserFromDB,
	checkPassword,
	addToken,
} = require("../middlewares/user-mws");

const router = express.Router();

router.post(
	"/signup",
	checkUserExistToDB,
	encodePassword,
	addUserToDB,
	userController
);

router.post("/login", findUserFromDB, checkPassword, addToken, userController);

module.exports = router;
