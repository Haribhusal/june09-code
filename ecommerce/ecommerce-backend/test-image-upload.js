const fs = require('fs');
const path = require('path');

// Test script to verify image upload functionality
console.log('Testing image upload setup...');

// Check if uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
const productsDir = path.join(uploadsDir, 'products');

if (fs.existsSync(uploadsDir)) {
    console.log('✅ Uploads directory exists');
} else {
    console.log('❌ Uploads directory missing');
}

if (fs.existsSync(productsDir)) {
    console.log('✅ Products upload directory exists');
} else {
    console.log('❌ Products upload directory missing');
}

// Check if directories are writable
try {
    fs.accessSync(productsDir, fs.constants.W_OK);
    console.log('✅ Products directory is writable');
} catch (error) {
    console.log('❌ Products directory is not writable');
}

console.log('\nImage upload setup verification complete!');
console.log('\nTo test the API endpoints:');
console.log('1. Create a product with image: POST /api/products (with multipart/form-data)');
console.log('2. Add more images: POST /api/products/:id/images');
console.log('3. Set main image: PATCH /api/products/:id/main-image');
console.log('4. Delete image: DELETE /api/products/:id/images/:imageId');
console.log('5. View images at: /uploads/products/filename');
