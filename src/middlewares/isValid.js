import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';
import { waterDaySchema, waterMonthSchema } from '../validation/water';

export function isValidId(req, res, next) {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return next(createHttpError(400, 'ID is not valid'));
  }
  next();
}

export function isValidDay(req, res, next) {
  const { day } = req.params;
  const { error, value } = waterDaySchema.validate(day);
  console.log('valid', value);
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
