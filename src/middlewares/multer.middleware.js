const multer = require('multer');
const { storage } = require('../utils/cloudinary.util');

const upload = multer({ storage });

module.exports = upload;
