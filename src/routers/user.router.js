const { Router } = require('express');
const passport = require('passport');
const storeReturnTo = require('../middlewares/storeReturnTo.middleware');
const {
	renderRegisterForm,
	renderLoginForm,
	registerUser,
	loginUser,
	logoutUser
} = require('../controllers/user.controller');

const router = Router();

router.get('/register', renderRegisterForm);

router.post('/register', registerUser);

router.get('/login', renderLoginForm);

router.post('/login', storeReturnTo, passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), loginUser);

router.get('/logout', logoutUser);

module.exports = router;
