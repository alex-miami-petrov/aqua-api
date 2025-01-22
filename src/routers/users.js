import { Router } from 'express';
import {
  getUsersController,
  getCurrentUserController,
  updateCurrentUserController,
} from '../controllers/users.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/multer.js';
import { bodyCleaner } from '../middlewares/bodyCleaner.js';
import { editUserSchema } from '../validation/users.js';

const router = Router();

router.get('/all', ctrlWrapper(getUsersController));
router.use(authenticate);

router.get('/current', ctrlWrapper(getCurrentUserController));

router.patch(
  '/current',
  upload.single('photo'),
  bodyCleaner,
  validateBody(editUserSchema),
  ctrlWrapper(updateCurrentUserController),
);

export default router;
