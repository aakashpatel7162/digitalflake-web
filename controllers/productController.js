const Product = require('../models/productModels');
const Subcategory = require('../models/subcategoryModels');

exports.createProduct = async (req, res) => {
  try {
    const { name, subcategory, price, stock, description, createdBy } = req.body;

    const existingProduct = await Product.findOne({ name, description });

    if (existingProduct) {
      return res.status(400).json({ message: 'Product with the same name and description already exists' });
    }

    const subcategoryExists = await Subcategory.findById(subcategory);
    if (!subcategoryExists) {
      return res.status(404).json({ message: 'Subcategory not found' });
    }

    const product = new Product({ name, subcategory, price, stock, description, createdBy });
    const savedProduct = await product.save();

    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error creating product', error: error.message });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate('subcategory', 'name')
      .populate('createdBy', 'username');
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving products', error: error.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id)
      .populate('subcategory', 'name')
      .populate('createdBy', 'username');

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving product', error: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, subcategory, price, stock, description } = req.body;

    if (subcategory) {
      const subcategoryExists = await Subcategory.findById(subcategory);
      if (!subcategoryExists) {
        return res.status(404).json({ message: 'Subcategory not found' });
      }
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, subcategory, price, stock, description },
      { new: true, runValidators: true }
    )
      .populate('subcategory', 'name')
      .populate('createdBy', 'username');

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error updating product', error: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error: error.message });
  }
};
