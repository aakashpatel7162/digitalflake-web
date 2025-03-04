const Category = require('../models/categoryModels');
exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const existingCategory = await Category.findOne({ name }); 
    if (existingCategory) {
      return res.status(400).json({ message: 'Category with this name already exists' });
    }
    const category = new Category({ name, description });
    const savedCategory = await category.save();

    res.status(201).json({ 
      message: 'Category created successfully', 
      category: savedCategory 
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error creating category', 
      error: error.message 
    });
  }
};

exports.getCategories = async (req, res) => {
  try {
    userId=req.userId
    const categories = await Category.find({ userId }).select('name description');
     res.status(200).json(categories);

  } catch (error) {
    res.status(500).json({ message: 'Error retrieving categories', error: error.message });
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const { id } = req.query; 
      const category = await Category.findById(id); 
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving category', error: error.message });
  }
};

exports.updateCategory = async (req, res) => {

  try {
    const { id } = req.params;
    const updateData = req.body; 
   
    const category = await Category.findByIdAndUpdate(id, updateData, { new: true });

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json(  {message: 'category updating success', category: category });
  } catch (error) {
    res.status(500).json({ message: 'Error updating category', error: error.message });
  }
};
;

exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting category', error: error.message });
  }
};
