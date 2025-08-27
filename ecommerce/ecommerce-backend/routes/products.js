const express = require('express');
const Product = require('../models/Product');
const {
  createProductSchema,
  updateProductSchema,
  productIdSchema
} = require('../validations/product');
const { validateRequest } = require('../middleware/validation');
const { authenticateToken, requireAdmin } = require('../middleware/auth');
const { uploadSingle, uploadMultiple, handleUploadError } = require('../middleware/upload');
const fs = require('fs').promises;
const path = require('path');

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
      .select('name description price discount category stock images mainImage isActive createdBy createdAt updatedAt')
      .populate('createdBy', 'name email')
      .sort(options.sort)
      .limit(options.limit)
      .skip((options.page - 1) * options.limit);

    const total = await Product.countDocuments(query);

    // Debug: Log the products to see what's being returned
    console.log('Backend - Products found:', products.length);
    if (products.length > 0) {
      console.log('Backend - First product:', {
        _id: products[0]._id,
        name: products[0].name,
        images: products[0].images,
        mainImage: products[0].mainImage,
        hasImages: !!products[0].images,
        imagesLength: products[0].images ? products[0].images.length : 0
      });
    }

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

// Create product with image upload (admin only)
router.post('/', authenticateToken, requireAdmin, uploadSingle, handleUploadError, validateRequest(createProductSchema), async (req, res) => {
  try {
    const productData = req.validatedData;
    productData.createdBy = req.user._id;

    // Handle image upload
    if (req.file) {
      const imageData = {
        filename: req.file.filename,
        originalName: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
        path: req.file.path
      };

      productData.images = [imageData];
      productData.mainImage = req.file.filename;
    }

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

// Upload additional images to existing product (admin only)
router.post('/:id/images', authenticateToken, requireAdmin, uploadMultiple, handleUploadError, async (req, res) => {
  try {
    const { id } = req.params;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        message: 'No images uploaded'
      });
    }

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        message: 'Product not found'
      });
    }

    // Add new images to the product
    const newImages = req.files.map(file => ({
      filename: file.filename,
      originalName: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      path: file.path
    }));

    product.images.push(...newImages);

    // Set main image if none exists
    if (!product.mainImage && newImages.length > 0) {
      product.mainImage = newImages[0].filename;
    }

    await product.save();
    await product.populate('createdBy', 'name email');

    res.json({
      success: true,
      message: 'Images uploaded successfully',
      product
    });
  } catch (error) {
    console.error('Upload images error:', error);
    res.status(500).json({
      message: 'Error uploading images',
      error: process.env.NODE_ENV === 'development' ? error.message : {}
    });
  }
});

// Delete specific image from product (admin only)
router.delete('/:id/images/:imageId', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { id, imageId } = req.params;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        message: 'Product not found'
      });
    }

    const imageIndex = product.images.findIndex(img => img.filename === imageId);
    if (imageIndex === -1) {
      return res.status(404).json({
        message: 'Image not found'
      });
    }

    const imageToDelete = product.images[imageIndex];

    // Remove image from array
    product.images.splice(imageIndex, 1);

    // Update main image if deleted image was main
    if (product.mainImage === imageId) {
      product.mainImage = product.images.length > 0 ? product.images[0].filename : null;
    }

    await product.save();

    // Delete file from filesystem
    try {
      await fs.unlink(imageToDelete.path);
    } catch (unlinkError) {
      console.error('Error deleting file:', unlinkError);
    }

    await product.populate('createdBy', 'name email');

    res.json({
      success: true,
      message: 'Image deleted successfully',
      product
    });
  } catch (error) {
    console.error('Delete image error:', error);
    res.status(500).json({
      message: 'Error deleting image',
      error: process.env.NODE_ENV === 'development' ? error.message : {}
    });
  }
});

// Set main image for product (admin only)
router.patch('/:id/main-image', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { imageId } = req.body;

    if (!imageId) {
      return res.status(400).json({
        message: 'Image ID is required'
      });
    }

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        message: 'Product not found'
      });
    }

    const imageExists = product.images.some(img => img.filename === imageId);
    if (!imageExists) {
      return res.status(404).json({
        message: 'Image not found in product'
      });
    }

    product.mainImage = imageId;
    await product.save();
    await product.populate('createdBy', 'name email');

    res.json({
      success: true,
      message: 'Main image updated successfully',
      product
    });
  } catch (error) {
    console.error('Update main image error:', error);
    res.status(500).json({
      message: 'Error updating main image',
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

    // Delete all associated image files
    if (product.images && product.images.length > 0) {
      for (const image of product.images) {
        try {
          await fs.unlink(image.path);
        } catch (unlinkError) {
          console.error('Error deleting file:', unlinkError);
        }
      }
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