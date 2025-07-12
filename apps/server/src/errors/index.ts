import CustomError from './customError';
import { StatusCodes } from 'http-status-codes';

class NotFoundError extends CustomError {
  constructor(message: string) {
    super({ message, statusCode: StatusCodes.NOT_FOUND });
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

class BadRequestError extends CustomError {
  constructor(message: string) {
    super({ message, statusCode: StatusCodes.BAD_REQUEST });
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

class UnauthorizedError extends CustomError {
  constructor(message: string) {
    super({ message, statusCode: StatusCodes.UNAUTHORIZED });
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

class ForbiddenError extends CustomError {
  constructor(message: string) {
    super({ message, statusCode: StatusCodes.FORBIDDEN });
    this.statusCode = StatusCodes.FORBIDDEN;
  }
}

class InternalServerError extends CustomError {
  constructor(message: string) {
    super({ message, statusCode: StatusCodes.INTERNAL_SERVER_ERROR });
    this.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  }
}

export {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  InternalServerError,
};
