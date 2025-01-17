const Category = require('../models/categoryModels');
const Subcategory = require('../models/subcategoryModels');

exports.createSubcategory = async (req, res) => {
  try {
    const { name, category, description ,status } = req.body;

        const existingCategory = await Subcategory.findOne({ name }); 
    
    if (existingCategory) {
      return res.status(400).json({ message: 'subcategory  already exists' });
    }
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(404).json({ message: 'Category not found' });
    }

    const subcategory = new Subcategory({ name, category, description ,status});
    const savedSubcategory = await subcategory.save();
    res.status(201).json({message: 'subcategory created successfully',subcategory:savedSubcategory});
  } catch (error) {
    res.status(500).json({ message: 'Error creating subcategory', error: error.message });
  }
};

exports.getSubcategories = async (req, res) => {
  try {
    const subcategories = await Subcategory.find().populate('category', 'name');
    res.status(200).json(subcategories);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving subcategories', error: error.message });
  }
};

exports.getSubcategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const subcategory = await Subcategory.findById(id).populate('category', 'name');

    if (!subcategory) {
      return res.status(404).json({ message: 'Subcategory not found' });
    }

    res.status(200).json(subcategory);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving subcategory', error: error.message });
  }
};

exports.updateSubcategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, description } = req.body;

    if (category) {
      const categoryExists = await Category.findById(category);
      if (!categoryExists) {
        return res.status(404).json({ message: 'Category not found' });
      }
    }

    const updatedSubcategory = await Subcategory.findByIdAndUpdate(
      id,
      { name, category, description },
      { new: true, runValidators: true }
    ).populate('category', 'name');

    if (!updatedSubcategory) {
      return res.status(404).json({ message: 'Subcategory not found' });
    }

    res.status(200).json(updatedSubcategory);
  } catch (error) {
    res.status(500).json({ message: 'Error updating subcategory', error: error.message });
  }
};

exports.deleteSubcategory = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSubcategory = await Subcategory.findByIdAndDelete(id);

    if (!deletedSubcategory) {
      return res.status(404).json({ message: 'Subcategory not found' });
    }

    res.status(200).json({ message: 'Subcategory deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting subcategory', error: error.message });
  }
};
