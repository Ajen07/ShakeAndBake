import express from "express";
import fileUpload from "express-fileupload";
import "express-async-errors";
import dotenv from "dotenv";
import cors from "cors";
import cloudinary from "cloudinary";
dotenv.config();

import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";


//Database Connection
import connectDB from "./db/connectDB.js";

//Routes
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import orderRoutes from './routes/orderRoutes.js'

//Middleware
import notFoundMiddleware from "./middlewares/notFound.js";
import errorHandlingMiddleware from "./middlewares/errorHandler.js";
import authentication from "./middlewares/authentication.js";

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(cors());
app.use(express.json());
app.use(fileUpload({ useTempFiles: true }));
cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});
app.use(express.static(path.resolve(__dirname, "./client/dist")));


app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/reviews", reviewRoutes);
app.use("/api/v1/orders",authentication,orderRoutes)
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/dist", "index.html"));
});

app.use(notFoundMiddleware);
app.use(errorHandlingMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
