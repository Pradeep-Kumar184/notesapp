import mongoose from "mongoose";
import colors from "colors";
import { configDotenv } from "dotenv";
const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
  } catch (error) {}
};
export default connectDb;
