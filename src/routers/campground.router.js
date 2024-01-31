const { Router } = require('express');
const { validateCampground } = require('../middlewares/validateSchemas.middleware');
const isLoggedIn = require('../middlewares/isLoggedIn.middleware');
const verifyAuthor = require('../middlewares/verifyAuthor.middleware');
const upload = require('../middlewares/multer.middleware');

const {
	showAllCampgrounds,
	renderCampgroundNewForm,
	createNewCampground,
	renderCampgroundEditForm,
	updateCampground,
	showCampground,
	deleteCampground

} = require('../controllers/campground.controller');

const router = Router();

router.get('/', showAllCampgrounds);

router.get('/new', isLoggedIn, renderCampgroundNewForm);

router.post('/', isLoggedIn, upload.array('image'), validateCampground, createNewCampground);

router.get('/:id/edit', isLoggedIn, verifyAuthor, renderCampgroundEditForm);

router.put('/:id/edit', isLoggedIn, verifyAuthor, upload.array('image'), validateCampground, updateCampground);

router.get('/:id', showCampground);

router.delete('/:id', isLoggedIn, verifyAuthor, deleteCampground);

module.exports = router;
