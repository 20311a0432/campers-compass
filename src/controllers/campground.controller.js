const asyncHandler = require('../utils/asyncHandler');
const Campground = require('../models/campground.model');
const { cloudinary } = require('../utils/cloudinary.util');

const showAllCampgrounds = asyncHandler(async (req, res) => {
	const campgrounds = await Campground.find({});
	res.render('campgrounds/index.ejs', { campgrounds });
});

const renderCampgroundNewForm = (req, res) => {
	res.render('campgrounds/new.ejs');
};

const renderCampgroundEditForm = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const campground = await Campground.findById(id);
	res.render('campgrounds/edit.ejs', { campground });
});

const createNewCampground = asyncHandler(async (req, res) => {
	const { campground } = req.body;
	const newCampground = new Campground(campground);
	newCampground.author = req.user._id;
	newCampground.images = req.files.map((file) => ({ url: file.path, filename: file.filename }));
	await newCampground.save();
	req.flash('info', 'Successfully created campground');
	res.redirect(`/campgrounds/${newCampground._id}`);
});

const showCampground = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const campground = await Campground.findById(id).populate({
		path: 'reviews',
		populate: {
			path: 'author'
		}
	}).populate('author');
	if (!campground) {
		req.flash('error', 'cannot find campground');
		res.redirect('/campgrounds');
		return;
	}
	res.render('campgrounds/show', { campground });
});

const updateCampground = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const { campground } = req.body;
	const newCampground = await Campground.findOneAndUpdate(
		{ _id: id },
		{ ...campground },
		{ new: true },
	);

	const newImages = req.files.map((file) => ({ url: file.path, filename: file.filename }));
	newCampground.images.push(...newImages);
	await newCampground.save();
	if (req.body.deleteImages) {
		for (const filename of req.body.deleteImages) {
			await cloudinary.uploader.destroy(filename);
		}
		await newCampground.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } });
	}

	req.flash('info', 'successfully edited');
	res.redirect(`/campgrounds/${id}`);
});

const deleteCampground = asyncHandler(async (req, res) => {
	const { id } = req.params;
	await Campground.findByIdAndDelete(id);
	req.flash('info', 'deleted successfully');
	res.redirect('/campgrounds');
});

module.exports = {
	showAllCampgrounds,
	renderCampgroundNewForm,
	createNewCampground,
	renderCampgroundEditForm,
	updateCampground,
	deleteCampground,
	showCampground
};
