import {
  BadRequestError,
  NotFoundError,
  UnAuthorizedError,
} from "../errors/index.js";
import Product from "../models/Product.js";
import cloudinary from "cloudinary";
import fs from "fs";
import { StatusCodes } from "http-status-codes";
import checkPermission from "../utils/checkPermissions.js";

const getAllProducts = async (req, res) => {
  const { search, page, category, type } = req.query;
  const queryObject = {};
  if (search) {
    queryObject.name = { $regex: search, $options: "i" };
  }
  if (category && category !== "general") {
    queryObject.category = category;
  }
  if (type && type !== "all") {
    queryObject.type = type;
  }
  const limit = 9;
  const skip = (Number(page) - 1) * limit;

  const products = await Product.find(queryObject).skip(skip).limit(limit);
  const totalPages = Math.ceil(products.length / limit);
  res
    .status(StatusCodes.OK)
    .json({ products, totalProducts: products.length, totalPages });
};
const getSingleProduct = async (req, res) => {
  const { id: productId } = req.params;
  const product = await Product.findOne({ _id: productId });
  if (!product) {
    throw new NotFoundError(`No product with id ${productId}`);
  }
  res.status(StatusCodes.OK).json({ product });
};
const createProduct = async (req, res) => {
  const { name, price, description, category, freeShipping, inventory, image } =
    req.body;
  if (!name || !price || !description || !image) {
    throw new BadRequestError("Please provide all the values");
  }
  const product = await Product.findOne({ name, category });
  if (product) {
    throw new BadRequestError("Cake already present");
  }
  const newProduct = await Product.create(req.body);
  res
    .status(StatusCodes.CREATED)
    .json({ msg: "Product created successfully!!!", newProduct });
};
const updateProduct = async (req, res) => {
  const { id: productId } = req.params;
  const product = await Product.findOne({ _id: productId });
  if (!product) {
    throw new NotFoundError(`No product with id ${productId}`);
  }
  checkPermission(req.user);
  const updateProduct = await Product.findOneAndUpdate(
    { _id: productId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  res
    .status(StatusCodes.ACCEPTED)
    .json({ msg: "Product updated successfully" });
};
const deleteProduct = async (req, res) => {
  const { id: productId } = req.params;
  console.log(req.params);
  const product = await Product.findOne({ _id: productId });
  if (!product) {
    throw new NotFoundError(`No product with id ${productId}`);
  }
  await product.remove();
  res.status(StatusCodes.OK).json({ msg: "Product deleted successfully !!!" });
};
const uploadImage = async (req, res) => {
  if (!req.files) {
    throw new BadRequestError("No file is uploaded");
  }
  const productImage = req.files.image;
  if (!productImage.mimetype.startsWith("image")) {
    throw new BadRequestError("Please upload a image");
  }
  const result = await cloudinary.v2.uploader.upload(
    req.files.image.tempFilePath,
    {
      use_filename: true,
      folder: "shakebakefileuploads",
    }
  );
  fs.unlinkSync(req.files.image.tempFilePath);
  res.json({ image: { src: result.secure_url } });
};

export {
  getAllProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
};
