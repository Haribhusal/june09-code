const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

const { safelyPopulateOrder, safelyPopulateOrders, cleanupOrphanedOrders } = require('./utils/safePopulate');
const Order = require('./models/Order');

async function testSafePopulate() {
    try {
        console.log('Testing safe populate functions...');

        // Test 1: Find an order and safely populate it
        const order = await Order.findOne();
        if (order) {
            console.log('Found order:', order._id);

            const populatedOrder = await safelyPopulateOrder(order._id);
            if (populatedOrder) {
                console.log('Successfully populated order');
                console.log('Items count:', populatedOrder.items.length);
                console.log('Items with valid products:', populatedOrder.items.filter(item => item.product && item.product.name).length);
            } else {
                console.log('Order not found or failed to populate');
            }
        } else {
            console.log('No orders found in database');
        }

        // Test 2: Find multiple orders and safely populate them
        const orders = await Order.find().limit(5);
        if (orders.length > 0) {
            console.log(`Found ${orders.length} orders`);

            const populatedOrders = await safelyPopulateOrders(orders);
            console.log(`Successfully populated ${populatedOrders.length} orders`);

            populatedOrders.forEach((order, index) => {
                console.log(`Order ${index + 1}: ${order.items.length} items, ${order.items.filter(item => item.product && item.product.name).length} valid products`);
            });
        }

        // Test 3: Check for orphaned orders
        console.log('\nChecking for orphaned orders...');
        const orphanedOrders = await Order.findOrphanedOrders();
        console.log(`Found ${orphanedOrders.length} orders with orphaned products`);

        if (orphanedOrders.length > 0) {
            console.log('Orphaned order IDs:', orphanedOrders.map(o => o._id));

            // Test cleanup function
            console.log('\nRunning cleanup...');
            const cleanupResult = await cleanupOrphanedOrders();
            console.log('Cleanup result:', cleanupResult);
        }

    } catch (error) {
        console.error('Test error:', error);
    } finally {
        mongoose.connection.close();
        console.log('MongoDB connection closed');
    }
}

// Run the test
testSafePopulate();
