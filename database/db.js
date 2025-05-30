const mongoose = require("mongoose");
require("dotenv").config();

const connection_url = process.env.MONGODB_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(connection_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("Mongodb connection error =", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;