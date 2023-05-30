const errorMw = (err, req, res, next) => {
	console.log(err.message);
	res.body = {
		status: `Failed`,
		...res.body,
	};
	res.send(res.body);
};
