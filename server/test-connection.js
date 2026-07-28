require("dotenv").config();
const mongoose = require("mongoose");

console.log("🔍 Testing MongoDB Connection...");
console.log("MONGO_URI exists:", !!process.env.MONGO_URI);
console.log(
  "MONGO_URI starts with mongodb+srv:",
  process.env.MONGO_URI?.startsWith("mongodb+srv://"),
);

mongoose
  .connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 30000,
  })
  .then(() => {
    console.log("✅ MongoDB Connected Successfully!");
    process.exit(0);
  })
  .catch((err) => {
    console.error("❌ Connection Error:", err.message);
    console.error("❌ Error Code:", err.code);
    console.error("❌ Error Name:", err.name);
    process.exit(1);
  });
