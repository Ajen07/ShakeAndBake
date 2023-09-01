import jwt from "jsonwebtoken";

const createJWT = (user) => {
  const token = jwt.sign(
    { userId: user._id, userRole: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_LIFETIME }
  );
  return token;
};
export default createJWT
