import createHttpError from 'http-errors';
import { isValidObjectId } from 'mongoose';

export const isValidId = (req, res, next) => {
  const { customerId } = req.params;

  if (!isValidObjectId(customerId)) {
    return next(createHttpError(400, 'ID is not valid'));
  }
  next();
};
