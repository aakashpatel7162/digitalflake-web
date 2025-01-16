const express = require('express');
const { addProduct } = require('../controllers/productController');
const { authenticate } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authenticate, addProduct);

module.exports = router;