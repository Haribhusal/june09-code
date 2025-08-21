const Order = require('../models/Order');

/**
 * Safely populate order data, handling cases where products might be deleted
 * @param {string} orderId - The order ID to populate
 * @returns {Promise<Object>} - The populated order with safe product data
 */
async function safelyPopulateOrder(orderId) {
    try {
        const order = await Order.findById(orderId)
            .populate({
                path: 'items.product',
                select: 'name description price image'
            })
            .populate('user', 'name email');

        if (!order) {
            return null;
        }

        // Clean up items with null products
        if (order.items && order.items.length > 0) {
            order.items = order.items.filter(item => item.product && item.product.name);
        }

        return order;
    } catch (error) {
        console.error('Error safely populating order:', error);
        throw error;
    }
}

/**
 * Safely populate multiple orders
 * @param {Array} orders - Array of order objects
 * @returns {Promise<Array>} - Array of orders with safe product data
 */
async function safelyPopulateOrders(orders) {
    try {
        const populatedOrders = await Order.populate(orders, [
            {
                path: 'items.product',
                select: 'name description price image'
            },
            {
                path: 'user',
                select: 'name email'
            }
        ]);

        // Clean up items with null products for each order
        populatedOrders.forEach(order => {
            if (order.items && order.items.length > 0) {
                order.items = order.items.filter(item => item.product && item.product.name);
            }
        });

        return populatedOrders;
    } catch (error) {
        console.error('Error safely populating orders:', error);
        throw error;
    }
}

/**
 * Clean up orders with deleted products
 * @returns {Promise<Object>} - Result of cleanup operation
 */
async function cleanupOrphanedOrders() {
    try {
        const mongoose = require('mongoose');
        const Product = mongoose.model('Product');

        // Find all orders
        const orders = await Order.find({});
        let cleanedCount = 0;
        let totalOrders = orders.length;

        for (const order of orders) {
            let hasChanges = false;

            if (order.items && order.items.length > 0) {
                const validItems = [];

                for (const item of order.items) {
                    if (item.product) {
                        const productExists = await Product.exists({ _id: item.product });
                        if (productExists) {
                            validItems.push(item);
                        } else {
                            hasChanges = true;
                            console.log(`Removing orphaned product reference ${item.product} from order ${order._id}`);
                        }
                    }
                }

                if (hasChanges) {
                    order.items = validItems;
                    // Recalculate total amount
                    order.totalAmount = validItems.reduce((total, item) => {
                        return total + (item.price * item.quantity);
                    }, 0);

                    await order.save();
                    cleanedCount++;
                }
            }
        }

        return {
            success: true,
            totalOrders,
            cleanedOrders: cleanedCount,
            message: `Cleaned up ${cleanedCount} orders with orphaned products`
        };
    } catch (error) {
        console.error('Error cleaning up orphaned orders:', error);
        throw error;
    }
}

module.exports = {
    safelyPopulateOrder,
    safelyPopulateOrders,
    cleanupOrphanedOrders
};
