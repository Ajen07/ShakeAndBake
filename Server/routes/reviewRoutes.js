import express from "express";
import {
  getAllReviews,
  getSingleReview,
  createReview,
  updateReview,
  deleteReview,
} from "../controllers/reviewController.js";
import authentication from "../middlewares/authentication.js";

const router = express.Router();

router.route("/").get(getAllReviews).post(authentication, createReview);
router
  .route("/:id")
  .get(getSingleReview)
  .patch(authentication, updateReview)
  .delete(authentication, deleteReview);


export default router;
