import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";
import stripe from "stripe";
import checkuserPermission from "../utils/checkuserPermission.js";

const getAllOrders = async (req, res) => {
  const orders = await Order.find({});
  res.status(StatusCodes.OK).json({ orders, totalOrders: orders.length });
};
const getSingleOrder = async (req, res) => {
  const { id: orderId } = req.params;
  const order = await Order.findOne({ _id: orderId });
  if (!order) {
    throw new NotFoundError(`No order with id:${orderId}`);
  }
  checkuserPermission(req.user, order.user);
  res.status(StatusCodes.OK).json({ order });
};
const getCurrentUserOrders = async (req, res) => {
  const orders = await Order.find({
    user: req.user.userId,
    status: { $not: { $regex: "pending" } },
  }).sort({ updatedAt: "desc" });
  res.status(StatusCodes.OK).json({ orders, totalOrders: orders.length });
};
const createOrder = async (req, res) => {
  const { cartItems } = req.body;

  if (!cartItems || cartItems.length < 1) {
    throw new BadRequestError("No cart items provided");
  }
  let deliveryCharges = 100;
  let orderItems = [];
  let total = 0;
  let subtotal = 0;
  for (const item of cartItems) {
    const product = await Product.findOne({ _id: item._id });
    if (!product) {
      throw new BadRequestError(`No product with id:${item.id}`);
    }
    const { name, image, price, quantity, _id } = item;
    const singleOrderItem = {
      name,
      image,
      price,
      quantity,
      productId: _id,
    };
    orderItems = [...orderItems, singleOrderItem];
    subtotal += parseInt(quantity) * parseInt(price);
  }
  if (subtotal > 500) {
    total = subtotal;
  } else {
    deliveryCharges = 100;
    total = subtotal + deliveryCharges;
  }
  const stripe2 = stripe(process.env.STRIPE_SECRET_KEY);
  const paymentIntent = await stripe2.paymentIntents.create({
    amount: total * 100,
    currency: "inr",
    automatic_payment_methods: {
      enabled: true,
    },
  });
  const newOrder = await Order.create({
    deliveryCharges,
    subtotal,
    total,
    orderItems,
    clientSecret: paymentIntent.client_secret,
    user: req.user.userId,
  });
  res.status(StatusCodes.CREATED).json({
    clientSecret: paymentIntent.client_secret,
    orderId: newOrder._id,
  });
};
const updateOrder = async (req, res) => {
  const { id: orderId } = req.params;
  const { paymentIntentId } = req.body;
  const order = await Order.findOne({ _id: orderId });
  if (!order) {
    throw new NotFoundError(`no order with id:${orderId}`);
  }
  checkuserPermission(req.user, order.user);
  order.status = "paid";
  order.paymentIntentId = paymentIntentId;
  await order.save();
  res.status(StatusCodes.OK).json({ order });
};
const cancelOrder = async (req, res) => {
  console.log("gre");
  const { orderId } = req.params;
  const order = await Order.findOne({ _id: orderId });
  if (!order) {
    throw new NotFoundError(`no order with id:${orderId}`);
  }
  checkuserPermission(req.user, order.user);
  order.status = "canceled";
  await order.save();
  res.status(StatusCodes.OK).json({ msg: "Order Canceled Successfully" });
};

export {
  getAllOrders,
  getSingleOrder,
  getCurrentUserOrders,
  createOrder,
  updateOrder,
  cancelOrder,
};
