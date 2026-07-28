const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;


// seed.js
// require('dotenv').config();
// const mongoose = require('mongoose');
// const Product = require('./models/Product');
// const { products } = require('./data');

// mongoose.connect(process.env.MONGO_URI)
//   .then(async () => {
//     console.log('Connected to MongoDB');
    
//     // Drop and reseed
//     await Product.deleteMany({});
//     await Product.insertMany(products);
    
//     console.log(`Seeded ${products.length} products`);
//     process.exit(0);
//   })
//   .catch(err => {
//     console.error(err);
//     process.exit(1);
//   });
