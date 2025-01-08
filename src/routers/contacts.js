import { Router } from 'express';
import {
  getContactsCtrl,
  getContactByIdCtrl,
  createContactCtrl,
  patchContactCtrl,
  deleteContactCtrl,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidId } from '../middlewares/isValidId.js';
import { validateBody } from '../middlewares/validateBody.js';
import { contactSchema, editContactSchema } from '../validation/contact.js';
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/multer.js';
import { bodyCleaner } from '../middlewares/bodyCleaner';

const router = Router();
router.use(authenticate);
// const jsonParser = express.json();

router.get('/', ctrlWrapper(getContactsCtrl));
router.get('/:contactId', isValidId, ctrlWrapper(getContactByIdCtrl));
router.post(
  '/',
  upload.single('photo'),
  bodyCleaner,
  validateBody(contactSchema),
  ctrlWrapper(createContactCtrl),
);
router.post(
  '/register',
  validateBody(contactSchema),
  ctrlWrapper(createContactCtrl),
);
router.patch(
  '/:contactId',
  isValidId,
  upload.single('photo'),
  bodyCleaner,
  validateBody(editContactSchema),
  ctrlWrapper(patchContactCtrl),
);
router.delete('/:contactId', isValidId, ctrlWrapper(deleteContactCtrl));

export default router;
