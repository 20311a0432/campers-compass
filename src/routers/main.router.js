const { Router } = require('express');
const mainController = require('../controllers/main.controller');
const Campground = require('../models/campground.model');

const router = Router();

router.route('/').get(mainController);

router.route('/allcampgrounds').get(async (req, res) => {
	const campgrounds = await Campground.find({});
	res.render('campgrounds/index.ejs', { campgrounds });
});

router.route('/makecampground').get(async (req, res) => {
	const campground = new Campground({
		title: 'india',
		price: '3000',
		description: 'good place ya kmow',
		location: 'india',
	});
	const camp = await campground.save();
	res.send(camp);
});

module.exports = router;
