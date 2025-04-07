import mongoose from "mongoose";

async function connectDB() {
  try {
    await mongoose.connect(`${process.env.LOCAL_DB}`);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
  }
}
export default connectDB;
