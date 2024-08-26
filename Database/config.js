// Database/config.js
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongodb_url = process.env.MONGODB_URL;

export const MongoDB = async () => {
  if (!mongodb_url) {
    throw new Error("MONGODB_URL is not defined in the environment variables");
  }
  try {
    await mongoose.connect(mongodb_url); // Removed deprecated options
    console.log("MongoDB Connection Successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw new Error("MongoDB connection failed");
  }
};
