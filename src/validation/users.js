import Joi from 'joi';

const stringField = Joi.string().min(3).max(20);

export const editUserSchema = Joi.object({
  name: stringField.optional(),
  gender: stringField.valid('woman', 'man').optional(),
  email: stringField.email().optional(),
  weight: Joi.number().optional(),
  waterNorma: Joi.number().optional(),
  activeTime: Joi.number().optional(),
  photo: Joi.string().uri().optional(),
});
