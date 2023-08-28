import mongoose from "mongoose";

const connectDB = (uri) => {
  return mongoose.connect(uri);
};
export default connectDB;
