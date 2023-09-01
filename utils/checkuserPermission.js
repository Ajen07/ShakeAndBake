import { UnAuthorizedError } from "../errors/index.js";

const checkuserPermission = (requestUser, userCreated) => {
  if (requestUser.userRole === "admin") {
    return;
  }
  if (requestUser.userId === userCreated.toString()) {
    return;
  }
  throw new UnAuthorizedError('Not allowed to access this route')
};
export default checkuserPermission;
