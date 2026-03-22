import mongoose from "mongoose";

const connectDB = async () => {
  const mongoURI = process.env.MONGODB_URI;
  if (!mongoURI) throw new Error("MONGODB_URI is not defined in your .env file");
  const conn = await mongoose.connect(mongoURI);
  console.log(`MongoDB connected: ${conn.connection.host}`);
};

export default connectDB;