import User from "../models/User.js";
import {
  BadRequestError,
  NotFoundError,
  UnAuthorizedError,
} from "../errors/index.js";
import { StatusCodes } from "http-status-codes";
import crypto from "crypto";
import verificationEmail from "../utils/sendVerificationEmail.js";
import createJWT from "../utils/createJwt.js";

const register = async (req, res) => {
  const { firstName, lastName, email, address, phoneNumber, password } =
    req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !address ||
    !phoneNumber ||
    !password
  ) {
    throw new BadRequestError("Please provide all the values");
  }
  const userAlreadyExists = await User.findOne({ email });
  if (userAlreadyExists) {
    throw new BadRequestError("User already exists");
  }
  const verificationCode = crypto.randomBytes(40).toString("hex");
  const user = await User.create({
    name: { firstName, lastName },
    email,
    password,
    address,
    phoneNumber,
    verificationCode,
  });
  const origin = "http://localhost:5173";
  await verificationEmail({ to: email, origin, verificationCode, email });
  res.status(StatusCodes.CREATED).json({ msg:"verification link sent" });
};
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("All the fields are required");
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw NotFoundError("User doesnot exists");
  }
  if (user.isVerified === false) {
    throw new UnAuthorizedError("Email Id is not verified");
  }
  const passwordMatch = await user.comparePassword(password);
  if (!passwordMatch) {
    throw new UnAuthorizedError("Password is incorrect");
  }
  user.password = undefined;
  const token = createJWT(user);
  res.status(StatusCodes.OK).json({ user, token });
};
const updateUser = async (req, res) => {
};
const verifyEmail = async (req, res) => {
  const { verificationCode, email } = req.body;
  if (!verificationCode || !email) {
    throw new BadRequestError("Invalid Request");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new NotFoundError("User doesnot exist");
  }
  if (user.verificationCode !== verificationCode) {
    throw new UnauthenticatedError("Invalid token");
  }
  user.verificationCode = "";
  user.isVerified = true;
  user.save();
  res.status(StatusCodes.OK).json({ msg: "Verification is successfull !!!" });
};

export { register, login, updateUser, verifyEmail };
