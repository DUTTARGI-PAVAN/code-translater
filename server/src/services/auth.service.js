import bcrypt from "bcryptjs";
import User from "../models/User.model.js";
import { generateToken } from "../utils/jwt.utils.js";
import { verifyGoogleToken } from "../config/google.config.js";

// Register
export const register = async (name, email, password) => {
  const existing = await User.findOne({ email });
  if (existing) {
    const error = new Error("Email already registered.");
    error.statusCode = 409;
    throw error;
  }
  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashed });
  const token = generateToken(user);
  return { token, user: { id: user._id, name: user.name, email: user.email, picture: user.picture } };
};

// Email Login
export const emailLogin = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user || !user.password) {
    const error = new Error("Invalid email or password.");
    error.statusCode = 401;
    throw error;
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    const error = new Error("Invalid email or password.");
    error.statusCode = 401;
    throw error;
  }
  user.lastLogin = new Date();
  await user.save();
  const token = generateToken(user);
  return { token, user: { id: user._id, name: user.name, email: user.email, picture: user.picture } };
};

// Google Login
export const googleLogin = async (credential) => {
  const googleUser = await verifyGoogleToken(credential);
  const user = await User.findOneAndUpdate(
    { googleId: googleUser.googleId },
    {
      googleId: googleUser.googleId,
      email: googleUser.email,
      name: googleUser.name,
      picture: googleUser.picture,
      lastLogin: new Date(),
    },
    { upsert: true, new: true, returnDocument: "after" }
  );
  const token = generateToken(user);
  return { token, user: { id: user._id, name: user.name, email: user.email, picture: user.picture } };
};

// Get Profile
export const getUserProfile = async (userId) => {
  const user = await User.findById(userId).select("-__v -googleId");
  if (!user) throw new Error("User not found");
  return { id: user._id, email: user.email, name: user.name, picture: user.picture };
};