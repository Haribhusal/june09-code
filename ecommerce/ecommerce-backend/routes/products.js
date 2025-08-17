const express = require('express');
const Product = require('../models/Product');
const {
  createProductSchema,
  updateProductSchema,
  productIdSchema
} = require('../validations/product');
const { validateRequest } = require('../middleware/validation');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// Get all products (public route)
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, category, search, sort = 'createdAt' } = req.query;

    const query = { isActive: true };

    // Filter by category
    if (category) {
      query.category = category;
    }

    // Search functionality
    if (search) {
      query.$text = { $search: search };
    }

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: { [sort]: -1 },
      populate: {
        path: 'createdBy',
        select: 'name email'
      }
    };

    const products = await Product.find(query)
      .populate('createdBy', 'name email')
      .sort(options.sort)
      .limit(options.limit)
      .skip((options.page - 1) * options.limit);

    const total = await Product.countDocuments(query);

    res.json({
      success: true,
      products,
      pagination: {
        page: options.page,
        limit: options.limit,
        total,
        pages: Math.ceil(total / options.limit)
      }
    });
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({
      message: 'Error fetching products',
      error: process.env.NODE_ENV === 'development' ? error.message : {}
    });
  }
});

// Get single product (public route)
router.get('/:id', validateRequest(productIdSchema), async (req, res) => {
  try {
    const { id } = req.validatedData;

    const product = await Product.findById(id)
      .populate('createdBy', 'name email');

    if (!product) {
      return res.status(404).json({
        message: 'Product not found'
      });
    }

    if (!product.isActive) {
      return res.status(404).json({
        message: 'Product not available'
      });
    }

    res.json({ product });
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({
      message: 'Error fetching product',
      error: process.env.NODE_ENV === 'development' ? error.message : {}
    });
  }
});

// Create product (admin only)
router.post('/', authenticateToken, requireAdmin, validateRequest(createProductSchema), async (req, res) => {
  try {
    const productData = req.validatedData;
    productData.createdBy = req.user._id;

    const product = new Product(productData);
    await product.save();

    await product.populate('createdBy', 'name email');

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      product
    });
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({
      message: 'Error creating product',
      error: process.env.NODE_ENV === 'development' ? error.message : {}
    });
  }
});

// Update product (admin only)
router.put('/:id', authenticateToken, requireAdmin, validateRequest(updateProductSchema), async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.validatedData;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        message: 'Product not found'
      });
    }

    Object.assign(product, updateData);
    await product.save();

    await product.populate('createdBy', 'name email');

    res.json({
      message: 'Product updated successfully',
      product,
      success: true
    });
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({
      message: 'Error updating product',
      error: process.env.NODE_ENV === 'development' ? error.message : {}
    });
  }
});

// Delete product (admin only)
router.delete('/:id', authenticateToken, requireAdmin, validateRequest(productIdSchema), async (req, res) => {
  try {
    const { id } = req.validatedData;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        message: 'Product not found'
      });
    }

    await Product.findByIdAndDelete(id);

    res.json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({
      message: 'Error deleting product',
      error: process.env.NODE_ENV === 'development' ? error.message : {}
    });
  }
});

// Get product categories (public route)
router.get('/categories/list', async (req, res) => {
  try {
    const categories = await Product.distinct('category');

    res.json({
      categories: categories.filter(category => category)
    });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({
      message: 'Error fetching categories',
      error: process.env.NODE_ENV === 'development' ? error.message : {}
    });
  }
});

module.exports = router; 