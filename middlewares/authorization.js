import { UnAuthorizedError } from "../errors/index.js";

const authorization = (req, res) => {
  if (req.user.userRole === "admin") {
    return;
  }
  throw new UnAuthorizedError("Not allowed to access this route");
};

export default authorization;
