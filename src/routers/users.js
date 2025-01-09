import { Router } from 'express';
import {
  getUsersController,
  getUserByIdController,
  createUserController,
  patchUserController,
  deleteUserController,
} from '../controllers/users.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidId } from '../middlewares/isValidId.js';
import { validateBody } from '../middlewares/validateBody.js';
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/multer.js';
import { bodyCleaner } from '../middlewares/bodyCleaner.js';
import { editUserSchema, userSchema } from '../validation/users.js';

const router = Router();
router.use(authenticate);
// const jsonParser = express.json();

router.get('/', ctrlWrapper(getUsersController));
router.get('/:userId', ctrlWrapper(getUserByIdController));
router.post(
  '/',
  upload.single('photo'),
  bodyCleaner,
  validateBody(userSchema),
  ctrlWrapper(createUserController),
);
router.post(
  '/register',
  validateBody(userSchema),
  ctrlWrapper(createUserController),
);
router.patch(
  '/:userId',
  isValidId,
  upload.single('photo'),
  bodyCleaner,
  validateBody(editUserSchema),
  ctrlWrapper(patchUserController),
);
router.delete('/:userId', isValidId, ctrlWrapper(deleteUserController));

export default router;
