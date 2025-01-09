import Joi from 'joi';

// export const registerUserSchema = Joi.object({

//   email: Joi.string().email().required(),
//   password: Joi.string().required(),
// });

export const registerUserSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Invalid email format.',
    'string.empty': 'Email is required.',
  }),
  password: Joi.string()
    .min(8)
    .pattern(
      new RegExp(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$',
      ),
    )
    .required()
    .messages({
      'string.min': 'Password must be at least 8 characters.',
      'string.pattern.base':
        'Password must include one uppercase letter, one lowercase letter, one number, and one special character.',
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
  repeatPassword: Joi.string().required().valid(Joi.ref('password')).messages({
    'any.only': 'Passwords must match.',
    'string.empty': 'Repeat password is required.',
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
