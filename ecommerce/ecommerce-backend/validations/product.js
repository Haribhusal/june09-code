const { z } = require('zod');

const createProductSchema = z.object({
  name: z.string()
    .min(2, 'Product name must be at least 2 characters long')
    .max(100, 'Product name must be less than 100 characters'),
  description: z.string()
    .min(10, 'Description must be at least 10 characters long')
    .max(1000, 'Description must be less than 1000 characters'),
  price: z.number()
    .positive('Price must be positive')
    .min(0.01, 'Price must be at least 0.01'),
  category: z.string()
    .min(2, 'Category must be at least 2 characters long')
    .max(50, 'Category must be less than 50 characters'),
  stock: z.number()
    .int('Stock must be an integer')
    .min(0, 'Stock cannot be negative'),
  image: z.string().url('Image must be a valid URL').optional().nullable()
});

const updateProductSchema = z.object({
  name: z.string()
    .min(2, 'Product name must be at least 2 characters long')
    .max(100, 'Product name must be less than 100 characters')
    .optional(),
  description: z.string()
    .min(10, 'Description must be at least 10 characters long')
    .max(1000, 'Description must be less than 1000 characters')
    .optional(),
  price: z.number()
    .positive('Price must be positive')
    .min(0.01, 'Price must be at least 0.01')
    .optional(),
  category: z.string()
    .min(2, 'Category must be at least 2 characters long')
    .max(50, 'Category must be less than 50 characters')
    .optional(),
  stock: z.number()
    .int('Stock must be an integer')
    .min(0, 'Stock cannot be negative')
    .optional(),
  image: z.string().url('Image must be a valid URL').optional().nullable(),
  isActive: z.boolean().optional()
});

const productIdSchema = z.object({
  id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid product ID')
});

module.exports = {
  createProductSchema,
  updateProductSchema,
  productIdSchema
}; 