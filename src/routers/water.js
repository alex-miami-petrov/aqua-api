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
import { isValidId } from '../middlewares/isValidId.js';
import { validateBody } from '../middlewares/validateBody.js';

// import { authenticate } from '../middlewares/authenticate.js';

const router = express.Router();
// router.use(authenticate);
// const jsonParser = express.json();

router.post(
  '/water',
  // jsonParser,
  validateBody(waterSchema),
  ctrlWrapper(createWaterRecordController),
);

router.delete(
  '/water/:id',
  isValidId,
  ctrlWrapper(deleteWaterRecordController),
);

router.patch(
  '/water/:id',
  // jsonParser,
  isValidId,
  validateBody(editWaterSchema),
  ctrlWrapper(patchWaterRecordController),
);

export default router;
