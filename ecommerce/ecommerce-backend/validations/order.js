const { z } = require('zod');

const orderItemSchema = z.object({
  productId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid product ID'),
  quantity: z.number()
    .int('Quantity must be an integer')
    .positive('Quantity must be positive')
    .min(1, 'Quantity must be at least 1')
});

const shippingAddressSchema = z.object({
  street: z.string()
    .min(5, 'Street address must be at least 5 characters long')
    .max(200, 'Street address must be less than 200 characters'),
  city: z.string()
    .min(2, 'City must be at least 2 characters long')
    .max(50, 'City must be less than 50 characters'),
  state: z.string()
    .min(2, 'State must be at least 2 characters long')
    .max(50, 'State must be less than 50 characters'),
  zipCode: z.string()
    .min(3, 'ZIP code must be at least 3 characters long')
    .max(10, 'ZIP code must be less than 10 characters'),
  country: z.string()
    .min(2, 'Country must be at least 2 characters long')
    .max(50, 'Country must be less than 50 characters')
});

const createOrderSchema = z.object({
  items: z.array(orderItemSchema)
    .min(1, 'At least one item is required'),
  shippingAddress: shippingAddressSchema,
  notes: z.string()
    .max(500, 'Notes must be less than 500 characters')
    .optional()
});

const updateOrderStatusSchema = z.object({
  status: z.enum(['pending', 'processing', 'shipped', 'delivered', 'cancelled'])
});

const orderIdSchema = z.object({
  id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid order ID')
});

module.exports = {
  createOrderSchema,
  updateOrderStatusSchema,
  orderIdSchema
}; 