import Joi from 'joi';

export const waterSchema = Joi.object({
  date: Joi.string().required(),
  volume: Joi.number().min(50).max(5000).required(),
  userId: Joi.string(),
});

export const editWaterSchema = Joi.object({
  date: Joi.string().required(),
  volume: Joi.number().min(50).max(5000).required(),
});

export const waterDaySchema = Joi.object({
  date: Joi.string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .required()
    .messages({
      'string.pattern.base': 'Date must be in format YYYY-MM-DD',
    }),
});
