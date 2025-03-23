import jwt from "jsonwebtoken";
import mongoose from "mongoose";

// MongoDB Connection
export const dbConnection = async () => {
  try {
    // Connect to MongoDB using MONGODB_URI from .env
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("DB connection established");
  } catch (error) {
    console.log("DB Error: " + error);
  }
};

// Create JWT Token and Set Cookie
export const createJWT = (res, userId) => {
  // Generate JWT token with userId as payload
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  // Change sameSite from strict to none when deploying the app
  res.cookie("token", token, {
    httpOnly: true, // Prevent client-side JS from accessing the cookie
    secure: process.env.NODE_ENV !== "development", // Secure in production
    sameSite: "strict", // Prevent CSRF attacks (update to "none" in production)
    maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day in milliseconds
  });
};
