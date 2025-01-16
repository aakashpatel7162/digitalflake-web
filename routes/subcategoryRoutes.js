const express = require('express');
const { addSubCategory } = require('../controllers/subCategoryControllers');
const { authenticate } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authenticate, addSubCategory);

module.exports = router;