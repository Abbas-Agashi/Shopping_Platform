const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  name: String,
  rating: Number,
  comment: String,
  createdAt: { type: Date, default: Date.now },
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  images: [{ type: String }],
  sizes: [{ type: String }],
  reviews: [reviewSchema],
  rating: { type: Number, default: 0 },
  numReviews: { type: Number, default: 0 },
});

module.exports = mongoose.model("Product", productSchema);
