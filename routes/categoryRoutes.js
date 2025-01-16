const express = require('express');
const { addCategory } = require('../controllers/categoryControllers');
const { authenticate } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authenticate, addCategory);

module.exports = router;