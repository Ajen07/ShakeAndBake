import { StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  NotFoundError,
  UnAuthorizedError,
} from "../errors/index.js";
import Product from "../models/Product.js";
import Review from "../models/Review.js";
import checkPermissions from "../utils/checkPermissions.js";
import checkuserPermission from "../utils/checkuserPermission.js";

const getAllReviews = async (req, res) => {
  const reviews = await Review.find({});

  res.status(StatusCodes.OK).json({ reviews, totalReviews: reviews.length });
};
const getSingleReview = async (req, res) => {
  const { id } = req.params;
  const reviews = await Review.findOne({ _id: id });
  res.status(StatusCodes.OK).json({ reviews });
};
const createReview = async (req, res) => {
  const { product: productId, title, comment, rating } = req.body;

  if (!title || !comment || !rating) {
    throw new BadRequestError("Please fill all the values");
  }

  const isValidProduct = await Product.findOne({ _id: productId });
  if (!isValidProduct) {
    throw new NotFoundError(`No product with id ${productId}`);
  }
  const duplicateReviewOfSameUser = await Review.findOne({
    product: productId,
    user: req.user.userId,
  });
  if (duplicateReviewOfSameUser) {
    throw new BadRequestError("You already have a review on this product");
  }
  req.body.user = req.user.userId;
  const review = await Review.create(req.body);
  res
    .status(StatusCodes.CREATED)
    .json({ msg: "review submitted successfully" });
};
const updateReview = async (req, res) => {
  const { id: reviewId } = req.params;
  const { title, comment, rating } = req.body;
  const review = await Review.findOne({ _id: reviewId });
  if (!review) {
    throw new NotFoundError(`No review with id ${reviewId}`);
  }
  checkuserPermission(req.user, review.user);

  review.title = title;
  review.comment = comment;
  review.rating = rating;
  await review.save();
  res.status(StatusCodes.OK).json({ msg: "Review updated successfully" });
};
const deleteReview = async (req, res) => {
  const { id: reviewId } = req.params;
  const review = await Review.findOne({ _id: reviewId });
  if (!review) {
    throw new NotFoundError(`No review with id ${reviewId}`);
  }
  checkuserPermission(req.user, review.user);
  await Review.deleteOne({ _id: reviewId });
  res.status(StatusCodes.OK).json({ msg: "Review deleted successfully" });
};
const getSingleProductReview = async (req, res) => {
  const { id } = req.params;
  const reviews = await Review.find({ product: id }).populate({path:'user',select:'name'});
  res.json({ reviews });
};
export {
  getAllReviews,
  getSingleReview,
  createReview,
  updateReview,
  deleteReview,
  getSingleProductReview
};
