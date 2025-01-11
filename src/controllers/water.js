import createHttpError from 'http-errors';

import {
  createWaterRecord,
  deleteWaterRecord,
  updateWaterRecord,
} from '../services/water.js';

export async function createWaterRecordController(req, res) {
  console.log('aaa');
  const result = await createWaterRecord({
    date: req.body.date,
    volume: req.body.volume,
    userId: req.user.id,
  });
  console.log(result);
  res.status(201).send({
    status: 201,
    message: 'Successfully created a waterRecord!',
    data: result,
  });
}

export async function deleteWaterRecordController(req, res) {
  const { id } = req.params;
  const userId = req.user._id;
  const record = await deleteWaterRecord(id, userId);
  if (!record) {
    throw new createHttpError.NotFound('water user record not found');
  }
  res.status(204).send();
}

export async function patchWaterRecordController(req, res) {
  const { id } = req.params;
  const userId = req.user._id;

  const result = await updateWaterRecord(id, userId, {
    ...req.body,
  });
  if (!result) {
    throw new createHttpError.NotFound('water user record not found');
  }
  res.send({
    status: 200,
    message: `Successfully patched a water user record!`,
    data: result,
  });
}

// export const getDayWaterController= async (req, res, next) => {
//   try {
//     const userId = req.user._id;
//     const { date } = req.params;

//     const user = await User.findById(userId);

//     if (!user) {
//       return next(HttpError(404, 'User not found'));
//     }

//
// };

// export const getMonthWaterController = async (req, res, next) => {
//   try {
//     const userId = req.user._id;
//     const user = await User.findById(userId);

//     if (!user) {
//       return next(HttpError(404, 'User not found'));
//     }

// };
