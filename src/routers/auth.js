import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import {
  registerUserSchema,
  loginUserSchema,
  requestResetEmailSchema,
  resetPasswordSchema,
  confirmAuthSchema,
} from '../validation/auth.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  registerUserCtrl,
  loginUserCtrl,
  refreshSessionCtrl,
  logoutUserCtrl,
  requestResetEmailCtrl,
  resetPasswordCtrl,
  getAuthUrlCtrl,
  confirmAuthCtrl,
} from '../controllers/auth.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

router.post(
  '/signup',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserCtrl),
);

router.post(
  '/signin',
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserCtrl),
);

router.get('/get-oauth-url', ctrlWrapper(getAuthUrlCtrl));

router.post(
  '/confirm-oauth',
  validateBody(confirmAuthSchema),
  ctrlWrapper(confirmAuthCtrl),
);

router.use(authenticate);

router.post('/refresh', ctrlWrapper(refreshSessionCtrl));

router.post('/logout', ctrlWrapper(logoutUserCtrl));

router.post(
  '/send-reset-email',
  validateBody(requestResetEmailSchema),
  ctrlWrapper(requestResetEmailCtrl),
);

router.post(
  '/reset-pwd',
  validateBody(resetPasswordSchema),
  ctrlWrapper(resetPasswordCtrl),
);

export default router;
