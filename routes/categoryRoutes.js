const express = require('express');
const router = express.Router();
const {authenticate} = require('../middleware/authMiddleware');
const {
    createCategory,
    getCategories,
    getCategoryById,
    updateCategory,
    deleteCategory,
} = require('../controllers/categoryControllers');
router.post('/', authenticate, createCategory);
router.get('/', authenticate, getCategories);
router.get('/', authenticate, getCategoryById);
router.put('/:id', authenticate, updateCategory);
router.delete('/:id', authenticate, deleteCategory);

module.exports = router;
