const express = require('express');
const Order = require('../models/Order');
const Product = require('../models/Product');
const {
  createOrderSchema,
  updateOrderStatusSchema,
  orderIdSchema
} = require('../validations/order');
const { validateRequest } = require('../middleware/validation');
const { authenticateToken, requireAdmin } = require('../middleware/auth');
const { sendEmail, sendEmailToAdmin } = require('../utils/sendEmail');
const { safelyPopulateOrder, safelyPopulateOrders, cleanupOrphanedOrders } = require('../utils/safePopulate');

const router = express.Router();



// Create order (authenticated users)
router.post('/', authenticateToken, validateRequest(createOrderSchema), async (req, res) => {
  const session = await Order.startSession();
  session.startTransaction();

  try {
    const { items, shippingAddress, notes } = req.validatedData;

    const orderItems = [];
    let totalAmount = 0;

    // Validate products & prepare order items
    for (const item of items) {
      const product = await Product.findById(item.productId).session(session);

      if (!product) {
        throw new Error(`Product with ID ${item.productId} not found`);
      }

      if (!product.isActive) {
        throw new Error(`Product ${product.name} is not available`);
      }

      if (product.stock < item.quantity) {
        throw new Error(
          `Insufficient stock for ${product.name}. Available: ${product.stock}`
        );
      }

      // Calculate discounted price
      const discountedPrice = product.price - (product.price * product.discount) / 100;

      // Calculate totals
      const itemTotal = discountedPrice * item.quantity
      totalAmount += itemTotal;

      // Prepare order item
      orderItems.push({
        product: product._id,
        quantity: item.quantity,
        price: discountedPrice
      });

      // Deduct stock
      product.stock -= item.quantity;
      await product.save({ session });
    }

    // Add shipping charge
    const shippingCharge = 200;
    const finalAmount = totalAmount + shippingCharge;

    // Create order
    const order = new Order({
      user: req.user._id,
      items: orderItems,
      totalAmount: finalAmount,
      shippingAddress,
      notes
    });

    await order.save({ session });

    // Commit transaction (all stock updates + order save)
    await session.commitTransaction();
    session.endSession();

    // Populate product + user
    await order.populate({
      path: 'items.product',
      select: 'name description price image discount'
    });
    await order.populate('user', 'name email');

    // Ensure user data exists
    if (!order.user || !order.user.email || !order.user.name) {
      console.error('User data missing for order:', order._id);
      return res.status(500).json({ message: 'User data not found for this order' });
    }

    // Prepare email details
    const email = order.user.email;
    const name = order.user.name;
    const orderId = order._id;
    const orderDate = order.createdAt;
    const orderStatus = order.status;

    const orderItemsToSend = order.items
      .filter(item => item.product && item.product.name)
      .map(item => ({
        product: item.product.name,
        quantity: item.quantity,
        price: item.price,
        discount: item.product.discount
      }));

    const orderItemsString =
      orderItemsToSend.length > 0
        ? orderItemsToSend
          .map(
            item =>
              `${item.product} - ${item.quantity} x ${item.price} - ${item.discount}% Off`
          )
          .join('\n')
        : 'Product information unavailable';

    // Send email to user
    const subject = 'Order created successfully';
    const message = `Hello ${name},
Your order has been created successfully.

Order ID: ${orderId}
Order Date: ${orderDate}
Order Total: ${finalAmount}
Shipping Charge: ${shippingCharge}
Order Status: ${orderStatus}

Order Items:
${orderItemsString}
    `;

    await sendEmail(email, subject, message);

    // Send email to admin
    const adminEmail = process.env.ADMIN_EMAIL;
    if (adminEmail) {
      const adminSubject = 'New order created';
      const adminMessage = `New order created by ${name} with order ID ${orderId} and total amount ${finalAmount}`;
      await sendEmailToAdmin(adminSubject, adminMessage, null, adminEmail);
    } else {
      console.warn('ADMIN_EMAIL not configured, skipping admin notification');
    }

    // Response
    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      order
    });
  } catch (error) {
    console.error('Create order error:', error);

    // Rollback if error
    await session.abortTransaction();
    session.endSession();

    res.status(500).json({
      message: error.message || 'Error creating order',
      error: process.env.NODE_ENV === 'development' ? error.stack : {}
    });
  }
});




// Get user's own orders
router.get('/my-orders', authenticateToken, async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;

    const query = { user: req.user._id };

    if (status) {
      query.status = status;
    }

    const orders = await Order.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));

    const populatedOrders = await safelyPopulateOrders(orders);

    const total = await Order.countDocuments(query);

    res.json({
      success: true,
      orders: populatedOrders,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Get user orders error:', error);
    res.status(500).json({
      message: 'Error fetching orders',
      error: process.env.NODE_ENV === 'development' ? error.message : {}
    });
  }
});

// Get single order (user can only see their own, admin can see any)
router.get('/:id', authenticateToken, validateRequest(orderIdSchema), async (req, res) => {
  try {
    const { id } = req.validatedData;

    const order = await safelyPopulateOrder(id);

    if (!order) {
      return res.status(404).json({
        message: 'Order not found'
      });
    }

    // Check if user is admin or the order owner
    if (req.user.role !== 'admin' && order.user._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: 'Access denied'
      });
    }

    res.json({ order });
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({
      message: 'Error fetching order',
      error: process.env.NODE_ENV === 'development' ? error.message : {}
    });
  }
});

// Get all orders (admin only)
router.get('/', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { page = 1, limit = 10, status, userId } = req.query;

    const query = {};

    if (status) {
      query.status = status;
    }

    if (userId) {
      query.user = userId;
    }

    const orders = await Order.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));

    const populatedOrders = await safelyPopulateOrders(orders);
    const total = await Order.countDocuments(query);

    res.json({
      success: true,
      orders: populatedOrders,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Get all orders error:', error);
    res.status(500).json({
      message: 'Error fetching orders',
      error: process.env.NODE_ENV === 'development' ? error.message : {}
    });
  }
});

// Update order status (admin only)
router.patch('/:id/status', authenticateToken, requireAdmin, validateRequest(updateOrderStatusSchema), async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.validatedData;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        message: 'Order not found'
      });
    }

    order.status = status;
    await order.save();



    // send email to admin
    await order.populate({
      path: 'items.product',
      select: 'name description price image'
    });

    await order.populate('user', 'name email');

    // Log populated data for debugging
    console.log('Populated order:', {
      orderId: order._id,
      userId: order.user?._id,
      userName: order.user?.name,
      userEmail: order.user?.email,
      itemsCount: order.items?.length,
      itemsWithProducts: order.items?.filter(item => item.product)?.length
    });



    // send email to user
    if (!order.user || !order.user.email || !order.user.name) {
      console.error('User data not properly populated for order:', order._id);
      return res.status(500).json({
        message: 'Error: User data not found for this order'
      });
    }

    const email = order.user.email;
    const name = order.user.name;
    const orderId = order._id;
    const orderDate = order.createdAt;
    const orderTotal = order.totalAmount;
    const orderStatus = order.status;

    // Filter out items with null products and create safe order items
    const orderItemsTosend = order.items
      .filter(item => item.product && item.product.name) // Only include items with valid products
      .map(item => ({
        product: item.product.name,
        quantity: item.quantity,
        price: item.price
      }));

    const orderItemsString = orderItemsTosend.length > 0
      ? orderItemsTosend.map(item => `${item.product} - ${item.quantity} x ${item.price}`).join('\n')
      : 'Product information unavailable';

    const subject = 'Order status updated';
    const message = `Hello ${name},
    Your order has been updated to ${status}.
    Order ID: ${orderId}
    Order Date: ${orderDate}
    Order Total: ${orderTotal}
    Order Status: ${orderStatus}
    Order Items: ${orderItemsString}
    `;
    await sendEmail(email, subject, message);



    res.json({
      success: true,
      message: 'Order status updated successfully',
      order
    });
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({
      message: 'Error updating order status',
      error: process.env.NODE_ENV === 'development' ? error.message : {}
    });
  }
});

// Get order statistics (admin only)
router.get('/stats/overview', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const pendingOrders = await Order.countDocuments({ status: 'pending' });
    const processingOrders = await Order.countDocuments({ status: 'processing' });
    const completedOrders = await Order.countDocuments({ status: 'delivered' });

    const totalRevenue = await Order.aggregate([
      { $match: { status: 'delivered' } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);

    res.json({
      stats: {
        totalOrders,
        pendingOrders,
        processingOrders,
        completedOrders,
        totalRevenue: totalRevenue[0]?.total || 0
      }
    });
  } catch (error) {
    console.error('Get order stats error:', error);
    res.status(500).json({
      message: 'Error fetching order statistics',
      error: process.env.NODE_ENV === 'development' ? error.message : {}
    });
  }
});

// Delete order
router.delete('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByIdAndDelete(id);
    if (!order) {
      return res.status(404).json({
        message: 'Order not found'
      });
    }

    res.json({
      success: true,
      message: 'Order deleted successfully',
      order
    });
  } catch (error) {
    console.error('Delete order error:', error);
    res.status(500).json({
      message: 'Error deleting order',
      error: process.env.NODE_ENV === 'development' ? error.message : {}
    });
  }
});

// Clean up orphaned orders (admin only)
router.post('/cleanup-orphaned', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const result = await cleanupOrphanedOrders();

    res.json({
      success: true,
      message: 'Cleanup completed successfully',
      result
    });
  } catch (error) {
    console.error('Cleanup orphaned orders error:', error);
    res.status(500).json({
      message: 'Error during cleanup',
      error: process.env.NODE_ENV === 'development' ? error.message : {}
    });
  }
});


module.exports = router; 