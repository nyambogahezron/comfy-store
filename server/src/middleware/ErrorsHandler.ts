import { StatusCodes } from 'http-status-codes';
import CustomError from '../errors/customError';
import { NextFunction, Request, Response } from 'express';

const ErrorHandlerMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): Response => {
  // default error
  let customError = new CustomError({
    message: 'Something went wrong, please try again later',
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
  });

  // check if error is an instance of CustomError
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  // check if error is a mongoose error
  if (err.name === 'ValidationError') {
    customError = new CustomError({
      message: err.message,
      statusCode: StatusCodes.BAD_REQUEST,
    });
    return res
      .status(customError.statusCode)
      .json({ message: customError.message });
  }

  if (err.name === 'CastError') {
    customError = new CustomError({
      message: 'Invalid ID',
      statusCode: StatusCodes.BAD_REQUEST,
    });
    return res
      .status(customError.statusCode)
      .json({ message: customError.message });
  }

  if (err.name === 'MongoError' && (err as any).code === 11000) {
    customError = new CustomError({
      message: 'Duplicate field value entered',
      statusCode: StatusCodes.BAD_REQUEST,
    });
    return res
      .status(customError.statusCode)
      .json({ message: customError.message });
  }

  // check if error is a JWT error
  if (err.name === 'JsonWebTokenError') {
    customError = new CustomError({
      message: 'Invalid token',
      statusCode: StatusCodes.UNAUTHORIZED,
    });
    return res
      .status(customError.statusCode)
      .json({ message: customError.message });
  }

  if (err.name === 'TokenExpiredError') {
    customError = new CustomError({
      message: 'Token expired',
      statusCode: StatusCodes.UNAUTHORIZED,
    });
    return res
      .status(customError.statusCode)
      .json({ message: customError.message });
  }

  return res.status(customError.statusCode).json({
    message: customError.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
};

export default ErrorHandlerMiddleware;
