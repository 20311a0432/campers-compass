const Campground = require('../models/campground.model');

const verifyAuthor = async (req, res, next) => {
	const { id } = req.params;
	const campground = await Campground.findById(id);
	if (!campground.author._id.equals(req.user._id)) {
		req.flash('error', 'You are not authorized');
		res.redirect(`/campgrounds/${id}`);
		return;
	}
	next();
};

module.exports = verifyAuthor;
