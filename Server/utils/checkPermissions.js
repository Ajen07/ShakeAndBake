import { UnAuthorizedError } from "../errors/index.js";

const checkPermission = (requestUser) => {
  if (requestUser.role === "admin") {
    return;
  }
  throw new UnAuthorizedError("Not allowed to access this route");
};
export default checkPermission;
