import express from 'express';

import {
  createWaterRecordController,
  deleteWaterRecordController,
  patchWaterRecordController,
  // getDayWaterController,
  // getMonthWaterController,
} from '../controllers/water.js';
import {
  waterSchema,
  editWaterSchema,
  // waterDaySchema,
  // waterMonthSchema,
} from '../validation/water.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
// import { isValidDay, isValidId, isValidMonth } from '../middlewares/isValid.js';
import { isValidId } from '../middlewares/isValid.js';
import { validateBody } from '../middlewares/validateBody.js';

import { authenticate } from '../middlewares/authenticate.js';

const router = express.Router();
router.use(authenticate);
// const jsonParser = express.json();

router.post(
  '/',
  validateBody(waterSchema),
  ctrlWrapper(createWaterRecordController),
);

router.delete('/:id', isValidId, ctrlWrapper(deleteWaterRecordController));

router.patch(
  '/:id',
  isValidId,
  validateBody(editWaterSchema),
  ctrlWrapper(patchWaterRecordController),
);

// router.get('/day/:date', isValidDay, getDayWaterController);
// router.get('/month/:month', isValidMonth, getMonthWaterController);

export default router;
