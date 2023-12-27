/* eslint-disable no-console */
const mongoose = require('mongoose');
const { mongodbUri, dbName } = require('../constants');

const connectDB = async () => {
	try {
		const connectionInstance = await mongoose.connect(`${mongodbUri}/${dbName}`);
		console.log('Connected to database successfully');
		console.log(connectionInstance.connection.host);
	} catch (error) {
		console.log('Error in connecting with MongoDB!!! ---> ', error);
	}
};

module.exports = connectDB;
