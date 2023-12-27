const asyncHandler = require('../utils/asyncHandler');
const Campground = require('../models/campground.model');
const Review = require('../models/review.model');

const addReview = asyncHandler(async (req, res, next) => {
	const newReview = new Review(req.body.review);
	newReview.author = req.user;
	await newReview.save();
	const campground = await Campground.findById(req.params.id);
	campground.reviews.push(newReview);
	await campground.save();
	req.flash('info', 'successfully added review');
	res.redirect(`/campgrounds/${campground._id}`);
});

const deleteReview = asyncHandler(async (req, res) => {
	const { id, revId } = req.params;
	await Campground.findByIdAndUpdate(id, { $pull: { reviews: revId } });
	await Review.findByIdAndDelete(revId);
	res.redirect(`/campgrounds/${id}`);
});

module.exports = {
	addReview,
	deleteReview
};
