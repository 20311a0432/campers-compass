require('dotenv').config();

const mongodbUri = String(process.env.MONGODB_URI);
const port = String(process.env.PORT || 3000);
const dbName = 'campground';

module.exports = {
	mongodbUri,
	port,
	dbName,
};
