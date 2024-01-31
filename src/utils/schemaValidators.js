// eslint-disable-next-line import/no-extraneous-dependencies
const Joi = require('joi');

const campgroundValidatorSchema = Joi.object({
	campground: Joi.object({
		title: Joi.string().required(),
		price: Joi.number().required().min(0),
		location: Joi.string().required(),
		description: Joi.string().required(),
	}).required(),
	deleteImages: Joi.array(),
});

const reviewValidatorShema = Joi.object({
	review: Joi.object({
		body: Joi.string().required(),
		rating: Joi.number().required().min(1).max(5)
	}).required()
});

module.exports = { campgroundValidatorSchema, reviewValidatorShema };
