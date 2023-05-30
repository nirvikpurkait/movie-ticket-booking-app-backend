const userController = (req, res) => {
	res.body = {
		status: `Success`,
		...res.body,
	};
	res.send(res.body);
};

module.exports = userController;
