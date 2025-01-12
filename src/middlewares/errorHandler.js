import { HttpError } from 'http-errors';

export const errorHandler = (err, req, res, next) => {
  // Checking, we received an error from createHttpError
  if (err instanceof HttpError) {
    return res.status(err.statusCode).json({
      status: err.statusCode,
      message: err.name,
      data: err,
    });
  }
  res.status(500).json({
    status: 500,
    message: 'Something went wrong',
    data: err.message,
  });
};
