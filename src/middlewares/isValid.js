import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';
import { waterDaySchema, waterMonthSchema } from '../validation/water.js';

export function isValidDay(req, res, next) {
  const { date } = req.params;
  const { error, value } = waterDaySchema.validate({ date });

  const testDate = new Date(date);
  if (
    testDate.toString() === 'Invalid Date' ||
    Number(testDate.getMonth() + 1) !== Number(date.slice(5, 7))
  ) {
    return next(createHttpError(400, 'Invalid Date'));
  }
  if (error) {
    return next(
      createHttpError(400, error.message + ` (Your value is ${value.date})`),
    );
  }
  next();
}

export function isValidMonth(req, res, next) {
  const { month } = req.params;
  const { error, value } = waterMonthSchema.validate({ month });

  if (error) {
    return next(
      createHttpError(400, error.message + ` (Your value is ${value.month})`),
    );
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
