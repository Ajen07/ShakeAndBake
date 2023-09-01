import { UnAuthorizedError } from "../errors/index.js";

const checkPermission = (requestUser) => {
  console.log(requestUser);
  if (requestUser.userRole === "admin") {
    return;
  }
  throw new UnAuthorizedError("Not allowed to access this route");
};
export default checkPermission;
