const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

router.get("/", async (req, res) => {
  const { keyword, category } = req.query;
  let query = {};

  if (keyword) {
    query.name = { $regex: keyword, $options: "i" };
  }
  if (category && category !== "All") {
    query.category = category;
  }

  const products = await Product.find(query);
  res.json(products);
});

router.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

router.post("/:id/reviews", async (req, res) => {
  const { name, rating, comment } = req.body;
  const product = await Product.findById(req.params.id);

  if (product) {
    const review = { name, rating, comment };
    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

router.post("/", async (req, res) => {
  const product = new Product(req.body);
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

router.put("/:id", async (req, res) => {
  const { name, price, description, category, images, sizes } = req.body;
  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.category = category;
    product.images = images;
    product.sizes = sizes;
    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

router.delete("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove();
    res.json({ message: "Product removed" });
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

module.exports = router;
