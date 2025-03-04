const express = require('express');
const router = express.Router();
const {createProduct,getProductById,updateProduct,deleteProduct,getProducts} = require('../controllers/productController');
const {authenticate} = require('../middleware/authMiddleware');

router.post('/', authenticate, createProduct);
router.get('/', authenticate, getProducts);
router.get('/:id', authenticate, getProductById);
router.put('/:id', authenticate, updateProduct);
router.delete('/:id', authenticate, deleteProduct);
module.exports = router;
