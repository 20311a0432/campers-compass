/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const PassportLocalStratergy = require('passport-local');
const ApiError = require('./utils/ApiError');
const User = require('./models/user.model');

const app = express();

/* Routers */
const userRouter = require('./routers/user.router');
const campgroundRouter = require('./routers/campground.router');
const reviewRouter = require('./routers/review.router');

/* View Engine */
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const sessionConfig = {
	secret: 'goodSecret',
	resave: false,
	saveUninitialized: true,
	cookie: {
		httpOnly: true,
	}
};

/* Middlewares */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(session(sessionConfig));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

passport.use(new PassportLocalStratergy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
	res.locals.currentUser = req.user;
	res.locals.info = req.flash('info');
	res.locals.error = req.flash('error');
	next();
});

app.use('/', userRouter);
app.use('/campgrounds/:id/reviews', reviewRouter);
app.use('/campgrounds', campgroundRouter);

app.all('*', (req, res, next) => {
	next(new ApiError(404, 'Page Not Found'));
});

app.use((err, req, res, next) => {
	const { statusCode = 500 } = err;
	if (!err.message) err.message = 'Something went wrong';
	res.status(statusCode).render('error', { err });
});

module.exports = app;
