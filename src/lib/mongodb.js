// lib/mongodb.js
import mongoose from "mongoose";

let isConnected = false; // Track connection status

export async function connectDB() {
  if (isConnected && mongoose.connection.readyState === 1) {
    return; // Already connected
  }

  try {
    const uri = process.env.MONGODB_URI;

    if (!uri) {
      throw new Error("Missing MONGODB_URI environment variable.");
    }

    await mongoose.connect(uri, {
      dbName: "WHITTINGTON",
    });

    isConnected = true;
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    throw err;
  }
}
