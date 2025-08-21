const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: [1, 'Quantity must be at least 1']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  }
});

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [orderItemSchema],
  totalAmount: {
    type: Number,
    required: [true, 'Total amount is required'],
    min: [0, 'Total amount cannot be negative']
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  shippingAddress: {
    street: {
      type: String,
      required: [true, 'Street address is required']
    },
    city: {
      type: String,
      required: [true, 'City is required']
    },
    state: {
      type: String,
      required: [true, 'State is required']
    },
    zipCode: {
      type: String,
      required: [true, 'ZIP code is required']
    },
    country: {
      type: String,
      required: [true, 'Country is required']
    }
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending'
  },
  notes: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Calculate total amount before saving
orderSchema.pre('save', function (next) {
  if (this.items && this.items.length > 0) {
    this.totalAmount = this.items.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  }
  next();
});

// Validate that products exist before saving
orderSchema.pre('save', async function (next) {
  if (this.items && this.items.length > 0) {
    const mongoose = require('mongoose');
    const Product = mongoose.model('Product');

    try {
      for (const item of this.items) {
        if (item.product) {
          const productExists = await Product.exists({ _id: item.product });
          if (!productExists) {
            return next(new Error(`Product with ID ${item.product} does not exist`));
          }
        }
      }
    } catch (error) {
      return next(error);
    }
  }
  next();
});

// Instance method to check if order has valid products
orderSchema.methods.hasValidProducts = async function () {
  if (!this.items || this.items.length === 0) {
    return true;
  }

  const mongoose = require('mongoose');
  const Product = mongoose.model('Product');

  for (const item of this.items) {
    if (item.product) {
      const productExists = await Product.exists({ _id: item.product });
      if (!productExists) {
        return false;
      }
    }
  }

  return true;
};

// Static method to find orders with orphaned products
orderSchema.statics.findOrphanedOrders = async function () {
  const mongoose = require('mongoose');
  const Product = mongoose.model('Product');

  const orders = await this.find({});
  const orphanedOrders = [];

  for (const order of orders) {
    if (order.items && order.items.length > 0) {
      for (const item of order.items) {
        if (item.product) {
          const productExists = await Product.exists({ _id: item.product });
          if (!productExists) {
            orphanedOrders.push(order);
            break;
          }
        }
      }
    }
  }

  return orphanedOrders;
};

module.exports = mongoose.model('Order', orderSchema); 