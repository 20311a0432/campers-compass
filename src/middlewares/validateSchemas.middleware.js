const { campgroundValidatorSchema, reviewValidatorShema } = require('../utils/schemaValidators');
const ApiError = require('../utils/ApiError');

const validateCampground = (req, res, next) => {
	const { error } = campgroundValidatorSchema.validate(req.body);
	if (error) {
		const msg = error.details.map((el) => el.message).join(',');
		throw new ApiError(400, msg);
	} else {
		next();
	}
};

const validateReview = (req, res, next) => {
	const { error } = reviewValidatorShema.validate(req.body);
	if (error) {
		const msg = error.details.map((el) => el.message).join(',');
		throw new ApiError(400, msg);
	} else {
		next();
	}
};

module.exports = { validateCampground, validateReview };
