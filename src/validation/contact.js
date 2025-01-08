import Joi from 'joi';

const stringField = Joi.string().min(3).max(20);

export const contactSchema = Joi.object({
  name: stringField.required(),
  phoneNumber: stringField.required(),
  email: stringField,
  isFavourite: Joi.boolean().default(false),
  contactType: stringField.valid('work', 'home', 'personal').required(),
});

export const editContactSchema = Joi.object({
  name: stringField,
  // photo: stringField,
  phoneNumber: stringField,
  email: stringField,
  isFavourite: Joi.boolean(),
  contactType: stringField.valid('work', 'home', 'personal'),
});
