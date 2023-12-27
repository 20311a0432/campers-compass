const { Router } = require('express');
const { validateReview } = require('../middlewares/validateSchemas.middleware');
const isLoggedIn = require('../middlewares/isLoggedIn.middleware');
const verifyReviewAuthor = require('../middlewares/verifyReviewAuthor.middleware');
const {
	addReview,
	deleteReview
} = require('../controllers/review.controller');

const router = Router({ mergeParams: true });

router.post('/', isLoggedIn, validateReview, addReview);

router.delete('/:revId', isLoggedIn, verifyReviewAuthor, deleteReview);

module.exports = router;
