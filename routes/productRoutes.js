import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  uploadImage,
} from "../controllers/productController.js";
import { getSingleProductReview } from "../controllers/reviewController.js";
import authentication from "../middlewares/authentication.js";

const router = express.Router();

router.route("/").get(getAllProducts).post(authentication, createProduct);
router.route("/upload-image").post(uploadImage);

router
  .route("/:id")
  .get(getSingleProduct)
  .patch(authentication, updateProduct)
  .delete(authentication, deleteProduct);
router.route("/:id/reviews").get(getSingleProductReview);

export default router;
