const mongoose = require('mongoose');
const connectDB = require('../src/db/connectDB');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../src/models/campground.model');

connectDB();
const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
	await Campground.deleteMany({});
	for (let i = 0; i < 50; i += 1) {
		const random1000 = Math.floor(Math.random() * 1000);
		const price = Math.floor(Math.random() * 20) + 10;
		const camp = new Campground({
			author: '658846c20e8d793463cbb120',
			location: `${cities[random1000].city}, ${cities[random1000].state}`,
			title: `${sample(descriptors)} ${sample(places)}`,
			images: [
				{
					url: 'https://res.cloudinary.com/dkgmsfnuk/image/upload/v1703532134/Yelpcamp/ambmfntthlblimpodsp3.jpg',
					filename: 'Yelpcamp/ambmfntthlblimpodsp3'
				},
				{
					url: 'https://res.cloudinary.com/dkgmsfnuk/image/upload/v1703532137/Yelpcamp/elbw10zfe3t2t79uancr.jpg',
					filename: 'Yelpcamp/elbw10zfe3t2t79uancr'
				}
			],
			description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ullam dicta velit culpa unde temporibus ab quasi non iure exercitationem, vero, ad officia atque? Nihil aspernatur sed vero, eos autem nemo?',
			price,
		});
		// eslint-disable-next-line no-await-in-loop
		await camp.save();
	}
};

seedDB().then(() => {
	mongoose.connection.close();
	console.log('connection closed');
});
