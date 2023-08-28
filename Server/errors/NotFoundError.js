import { StatusCodes } from "http-status-codes";
class NotFoundError extends Error{
    constructor(message){
        super(message);
        this.statusCode=StatusCodes.NOT_FOUND;
    }
}

export default NotFoundError;