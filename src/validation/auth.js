import Joi from 'joi';

export const registerUserSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Invalid email format.',
    'string.empty': 'Email is required.',
  }),
  password: Joi.string()
    .min(8)
    .max(32)
    .pattern(
      new RegExp(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$',
      ),
    )
    .required()
    .messages({
      'string.min': 'Password must be at least 8 characters.',
      'string.max': 'Password must not exceed 32 characters.',
      'string.pattern.base':
        'Password must be 8-32 characters long, containing at least one uppercase letter, one lowercase letter, one number, and one special character.',
      'string.empty': 'Password is required.',
    }),
});

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
  password: Joi.string()
    .min(8)
    .max(32)
    .pattern(
      new RegExp(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$',
      ),
    )
    .required()
    .messages({
      'string.empty': 'Password is required.',
      'string.min': 'Password must be at least 8 characters.',
      'string.max': 'Password must not exceed 32 characters.',
      'string.pattern.base':
        'Password must be 8-32 characters long, containing at least one uppercase letter, one lowercase letter, one number, and one special character.',
    }),
  token: Joi.string().required().messages({
    'string.empty': 'Token is required.',
  }),
});

export const confirmAuthSchema = Joi.object({
  code: Joi.string().required(),
});
