import { Router } from 'express';
import {
  getUsersController,
  createUserController,
  getCurrenttUserController,
  updateCurrentUserController,
} from '../controllers/users.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/multer.js';
import { bodyCleaner } from '../middlewares/bodyCleaner.js';
import { editUserSchema, userSchema } from '../validation/users.js';

const router = Router();

router.get('/all', ctrlWrapper(getUsersController));
router.use(authenticate);

router.get('/current', ctrlWrapper(getCurrenttUserController));

router.post(
  '/',
  upload.single('photo'),
  bodyCleaner,
  validateBody(userSchema),
  ctrlWrapper(createUserController),
);

router.patch(
  '/current',
  upload.single('photo'),
  bodyCleaner,
  validateBody(editUserSchema),
  ctrlWrapper(updateCurrentUserController),
);

export default router;
