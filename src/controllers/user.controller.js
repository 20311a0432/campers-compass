const asyncHandler = require('../utils/asyncHandler');
const User = require('../models/user.model');

const renderRegisterForm = (req, res) => {
	res.render('users/register');
};

const renderLoginForm = (req, res) => {
	res.render('users/login');
};

const registerUser = asyncHandler(async (req, res, next) => {
	try {
		const { username, email, password } = req.body;
		const newUser = new User({ email, username });
		const registeredUser = await User.register(newUser, password);
		req.login(registeredUser, (err) => {
			if (err) {
				next(err);
				return;
			}
			req.flash('info', 'registered successfully');
			res.redirect('/campgrounds');
		});
	} catch (err) {
		req.flash('error', err.message);
		res.redirect('/register');
	}
});

const loginUser = (req, res) => {
	if (!res.locals.redirectUrl) req.flash('info', 'Welcome Back');
	const redirectUrl = res.locals.redirectUrl || '/campgrounds';
	res.redirect(redirectUrl);
};

const logoutUser = (req, res, next) => {
	req.logout((err) => {
		if (err) {
			next(err);
			return;
		}
		req.flash('info', 'Good Bye Fuckerrr');
		res.redirect('/campgrounds');
	});
};

module.exports = {
	renderRegisterForm,
	renderLoginForm,
	registerUser,
	loginUser,
	logoutUser
};
