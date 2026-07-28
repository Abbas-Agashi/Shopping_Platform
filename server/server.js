// MUST BE FIRST - Load environment variables
require("dotenv").config();

// Then import other modules
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const products = require("./data");
const Product = require("./models/Product");

const app = express();

// Connect to database BEFORE any routes
connectDB();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL, 
  credentials: true
}));
app.use(express.json());

// Routes
app.use("/api/products", productRoutes);
app.use("/api/payment", paymentRoutes);

// Seed Route
app.get("/api/seed", async (req, res) => {
  try {
    await Product.deleteMany({});
    const createdProducts = await Product.insertMany(products);
    res.json({ message: "Products Seeded", products: createdProducts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
