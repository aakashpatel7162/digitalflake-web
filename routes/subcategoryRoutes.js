const express = require('express');
const router = express.Router();
const {authenticate} = require('../middleware/authMiddleware');
const {createSubcategory,getSubcategories,getSubcategoryById,updateSubcategory,deleteSubcategory} = require('../controllers/subCategoryControllers');

router.post('/', authenticate, createSubcategory);
router.get('/', authenticate, getSubcategories);
router.get('/:id', authenticate, getSubcategoryById);
router.put('/:id', authenticate, updateSubcategory);
router.delete('/:id', authenticate, deleteSubcategory);


module.exports = router;
