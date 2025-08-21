const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        checkProducts();
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    });

async function checkProducts() {
    try {
        const Product = require('./models/Product');

        // Get all products
        const products = await Product.find({});
        console.log(`\nTotal products in database: ${products.length}`);

        if (products.length === 0) {
            console.log('No products found in database');
            return;
        }

        // Check each product
        products.forEach((product, index) => {
            console.log(`\n--- Product ${index + 1} ---`);
            console.log(`ID: ${product._id}`);
            console.log(`Name: ${product.name}`);
            console.log(`Has images field: ${!!product.images}`);
            console.log(`Images array length: ${product.images ? product.images.length : 'N/A'}`);
            console.log(`Main image: ${product.mainImage || 'None'}`);

            if (product.images && product.images.length > 0) {
                console.log('Images:');
                product.images.forEach((img, imgIndex) => {
                    console.log(`  ${imgIndex + 1}. ${img.filename} (${img.originalName})`);
                });
            } else {
                console.log('No images found');
            }
        });

        // Check if any products have images
        const productsWithImages = products.filter(p => p.images && p.images.length > 0);
        console.log(`\nProducts with images: ${productsWithImages.length}/${products.length}`);

        if (productsWithImages.length === 0) {
            console.log('\n⚠️  No products have images yet!');
            console.log('You need to create products with images first.');
        }

    } catch (error) {
        console.error('Error checking products:', error);
    } finally {
        mongoose.connection.close();
    }
}
