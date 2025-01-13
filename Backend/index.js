import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import bookRoute from "./route/bookRoute.js";
import userRoute from "./route/userRoute.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Mengambil variabel dari file .env
dotenv.config();

// Menyiapkan port dan URI MongoDB
const PORT = process.env.PORT || 4001; // Jika PORT tidak ada di .env, default ke 4001
const URI = process.env.MongoDBURI;

const connectDB = async () => {
  try {
    await mongoose.connect(URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1); // Keluar jika koneksi gagal
  }
};

// Menjalankan koneksi MongoDB
connectDB();

// Defining routes
app.use("/book", bookRoute);
app.use("/user", userRoute);

// Start server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
