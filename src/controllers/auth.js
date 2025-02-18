import createHttpError from 'http-errors';
import { ONE_DAY } from '../constans/index.js';
import {
  registerUser,
  loginUser,
  refreshSession,
  logoutUser,
  requestResetToken,
  resetPassword,
  loginOrRegister,
} from '../services/auth.js';
// import { generateAuthUrl, validateCode } from '../utils/googleOAuth2.js';
import { generateAuthUrl, validateIdToken } from '../utils/googleOAuth2.js';

export const registerUserCtrl = async (req, res) => {
  const user = await registerUser(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered user!',
    data: user,
  });
};

export const loginUserCtrl = async (req, res) => {
  const { email, password } = req.body;

  const session = await loginUser(email, password);

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
    expires: new Date(Date.now() + ONE_DAY),
  });

  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });

  res.json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const refreshSessionCtrl = async (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    throw createHttpError(401, 'Refresh token is missing');
  }

  const session = await refreshSession(refreshToken);

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: 'Lax',
    expires: new Date(Date.now() + ONE_DAY),
  });

  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });

  res.status(200).json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const logoutUserCtrl = async (req, res) => {
  if (req.cookies.sessionId) {
    await logoutUser(req.cookies.sessionId);
  }

  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');

  res.status(204).send();
};

export const requestResetEmailCtrl = async (req, res) => {
  await requestResetToken(req.body.email);

  res.json({
    message: 'Reset password email was successfully sent!',
    status: 200,
    data: {},
  });
};

export const resetPasswordCtrl = async (req, res) => {
  await resetPassword(req.body);

  res.json({
    message: 'Password was successfully reset!',
    status: 200,
    data: {},
  });
};

export const getAuthUrlCtrl = async (req, res) => {
  const url = generateAuthUrl();

  res.send({
    status: 200,
    message: 'Successfully get Google OAuth url',
    data: { url },
  });
};

export const confirmAuthCtrl = async (req, res, next) => {
  const { idToken } = req.body;

  if (!idToken) {
    return next(createHttpError(400, 'ID Token is required'));
  }

  try {
    // Верифікація ID токену через Google
    const payload = await validateIdToken(idToken);

    const userPayload = {
      ...payload,
      photo: payload.picture,
    };

    // Створення або авторизація користувача в системі
    const session = await loginOrRegister(userPayload);

    // Збереження токенів у cookie
    res.cookie('refreshToken', session.refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      expires: new Date(Date.now() + ONE_DAY),
    });

    res.cookie('sessionId', session._id, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      expires: new Date(Date.now() + ONE_DAY),
    });

    // Відповідь з accessToken та даними користувача
    res.status(200).json({
      status: 200,
      message: 'Login with Google successfully!',
      data: {
        accessToken: session.accessToken,
        user: {
          name: userPayload.name,
          email: userPayload.email,
          photo: userPayload.photo,
        },
      },
    });
  } catch (error) {
    next(
      error.status
        ? error
        : createHttpError(400, 'Invalid or expired ID Token'),
    );
  }
};

// export const confirmAuthCtrl = async (req, res, next) => {
//   const { idToken } = req.body;

//   if (!idToken) {
//     return next(createHttpError(400, 'ID Token is required'));
//   }

//   try {
//     const payload = await validateIdToken(idToken);

//     const userPayload = {
//       ...payload,
//       photo: payload.picture,
//     };

//     const session = await loginOrRegister(payload);

//     res.cookie('refreshToken', session.refreshToken, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === 'production',
//       sameSite: 'strict',
//       expires: new Date(Date.now() + ONE_DAY),
//     });

//     res.cookie('sessionId', session._id, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === 'production',
//       sameSite: 'strict',
//       expires: new Date(Date.now() + ONE_DAY),
//     });

//     res.status(200).json({
//       status: 200,
//       message: 'Login with Google successfully!',
//       data: {
//         accessToken: session.accessToken,
//         user: {
//           name: userPayload.name,
//           email: userPayload.email,
//           photo: userPayload.photo,
//         },
//       },
//     });
//   } catch (error) {
//     next(
//       error.status
//         ? error
//         : createHttpError(400, 'Invalid or expired ID Token'),
//     );
//   }
// };

// export const confirmAuthCtrl = async (req, res) => {
//   const { code } = req.body;
//   if (!code) {
//     throw createHttpError(400, 'Authorization code is required');
//   }
//   try {
//     const ticket = await validateCode(code);
//     const session = await loginOrRegister(ticket.payload);

//     res.cookie('refreshToken', session.refreshToken, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === 'production',
//       sameSite: 'strict',
//       expires: new Date(Date.now() + ONE_DAY),
//     });

//     res.cookie('sessionId', session._id, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === 'production',
//       sameSite: 'strict',
//       expires: new Date(Date.now() + ONE_DAY),
//     });

//     res.status(200).json({
//       status: 200,
//       message: 'Login with Google successfully!',
//       data: {
//         accessToken: session.accessToken,
//       },
//     });
//   } catch (error) {
//     throw createHttpError(400, 'Invalid or expired Google authorization code');
//   }
// };
