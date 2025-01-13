import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';
import { waterDaySchema, waterMonthSchema } from '../validation/water.js';

export function isValidDay(req, res, next) {
  const { date } = req.params;
  console.log('day', date);
  const { error, value } = waterDaySchema.validate(date);
  console.log('valid', value);
  console.log('error', error);
  if (error) {
    return next(createHttpError(400, error.message));
  }
  next();
}

export function isValidMonth(req, res, next) {
  const { month } = req.params;
  const { error, value } = waterMonthSchema.validate(month);

  if (error) {
    return next(createHttpError(400, error.message));
  }
  next();
}

export function isValidId(req, res, next) {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return next(createHttpError(400, 'ID is not valid'));
  }
  next();
}
