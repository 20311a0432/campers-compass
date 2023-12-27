const storeReturnTo = (req, res, next) => {
	if (req.session.returnTo) {
		res.locals.redirectUrl = req.session.returnTo;
	}
	next();
};

module.exports = storeReturnTo;
