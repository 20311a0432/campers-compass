const mongoose = require('mongoose');
const Review = require('./review.model');

const CampgroundSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	images: [
		{
			url: String,
			filename: String
		}
	],
	price: Number,
	description: String,
	location: String,
	reviews: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Review'
		}
	]
});

CampgroundSchema.post('findOneAndDelete', async (campground) => {
	if (campground) {
		await Review.deleteMany({
			_id: {
				$in: campground.reviews
			}
		});
	}
});

const Campground = mongoose.model('Campground', CampgroundSchema);

module.exports = Campground;
