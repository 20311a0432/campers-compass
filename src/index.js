/* eslint-disable no-console */
require('dotenv').config({ path: './.env' });
const connectDB = require('./db/connectDB');
const app = require('./app');
const { port } = require('./constants');

connectDB()
	.then(() => {
		app.listen(port, () => {
			console.log(`server is listening on ${port}`);
		});
	})
	.catch((error) => {
		console.log('error while Connecting to app!!! --> ', error);
	});
