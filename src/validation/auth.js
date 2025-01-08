import Joi from 'joi';

export const registerUserSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

// export const registerUserSchema = Joi.object({
//   name: Joi.string().trim().min(3).max(30).required().messages({
//     'string.empty': 'Name is required.',
//     'string.min': 'Name must be at least 3 characters.',
//     'string.max': 'Name must be less than 30 characters.',
//   }),
//   email: Joi.string().email().required().messages({
//     'string.email': 'Invalid email format.',
//     'string.empty': 'Email is required.',
//   }),
//   password: Joi.string()
//     .min(8)
//     .pattern(
//       new RegExp(
//         '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$',
//       ),
//     )
//     .required()
//     .messages({
//       'string.min': 'Password must be at least 8 characters.',
//       'string.pattern.base':
//         'Password must include one uppercase letter, one lowercase letter, one number, and one special character.',
//       'string.empty': 'Password is required.',
//     }),
// });

export const loginUserSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Invalid email format.',
    'string.empty': 'Email is required.',
  }),
  password: Joi.string().required().messages({
    'string.empty': 'Password is required.',
  }),
});

export const requestResetEmailSchema = Joi.object({
  email: Joi.string().email().required(),
});

export const resetPasswordSchema = Joi.object({
  password: Joi.string().required(),
  token: Joi.string().required(),
});

export const confirmAuthSchema = Joi.object({
  code: Joi.string().required(),
});
