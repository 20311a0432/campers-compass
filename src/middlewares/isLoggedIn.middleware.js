const isLoggedIn = (req, res, next) => {
	if (!req.isAuthenticated()) {
		req.session.returnTo = req.originalUrl;
		req.flash('info', 'You must be logged in');
		res.redirect('/login');
		return;
	}
	next();
};

module.exports = isLoggedIn;
