const Review = require('../models/review.model');

const verifyReviewAuthor = async (req, res, next) => {
	const { id, revId } = req.params;
	const review = await Review.findById(revId);
	if (!review.author._id.equals(req.user._id)) {
		req.flash('info', 'you are not authorized');
		res.redirect(`/campgrounds/${id}`);
		return;
	}
	next();
};

module.exports = verifyReviewAuthor;
