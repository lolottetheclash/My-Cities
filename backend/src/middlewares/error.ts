import { Request, Response, NextFunction } from 'express';

import ErrorResponse from '../utils/errorResponse';

const errorHandler = (
  err: ErrorResponse,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let error = { ...err };
  error.message = err.message;

  // Mongoose Bad Id
  if (err.name === 'CastError') {
    const message = `Resource not found with id of ${err.value}`;
    error = new ErrorResponse(message, 404);
  }

  // Mongoose Duplicate Key
  if (err.code === 11000) {
    const message = `Resource already exists`;
    error = new ErrorResponse(message, 409);
  }

  // Finally send the response with custom error
  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || 'Server error',
  });
};

export default errorHandler;
