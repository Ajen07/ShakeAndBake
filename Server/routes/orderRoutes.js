import express from "express";

import {
  getAllOrders,
  getSingleOrder,
  getCurrentUserOrders,
  updateOrder,
  createOrder,
  cancelOrder,
} from "../controllers/orderController.js";
import authorization from "../middlewares/authorization.js";

const router = express.Router();

router.route("/").get(authorization, getAllOrders).post(createOrder);
router.route("/showAllMyOrders").get(getCurrentUserOrders);
router.route("/cancelOrder/:orderId").patch(cancelOrder);
router.route("/:id").patch(updateOrder).get(getSingleOrder);

export default router;
