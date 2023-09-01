import express from "express";
import {
  register,
  login,
  updateUser,
  verifyEmail
} from "../controllers/authController.js";
const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/verify-email").post(verifyEmail)

export default router;
