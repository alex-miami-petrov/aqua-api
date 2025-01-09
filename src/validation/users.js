import Joi from 'joi';

const stringField = Joi.string().min(3).max(20);

export const userSchema = Joi.object({
  name: stringField.optional(),
  email: stringField.email().required(),
  gender: stringField.valid('woman', 'man').optional(),
  password: stringField.required(),
  weight: Joi.number().optional(),
  waterNorma: Joi.number().optional().max(15000),
  activeTime: Joi.number().optional(),
});

export const editUserSchema = Joi.object({
  name: stringField.optional(),
  phoneNumber: stringField.optional(),
  email: stringField.optional,
  gender: stringField.valid('woman', 'man').optional(),
  weight: Joi.number().optional(),
  waterNorma: Joi.number().optional(),
  activeTime: Joi.number().optional(),
  photo: Joi.string().uri().optional(),
});
