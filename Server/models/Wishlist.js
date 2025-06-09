const mongoose = require('mongoose');

const wishlistItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  }
}, { _id: false });

const wishlistSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true // one wishlist per user
  },
  items: {
    type: [wishlistItemSchema],
    default: []
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Wishlist', wishlistSchema);
