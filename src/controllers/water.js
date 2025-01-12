import createHttpError from 'http-errors';

import {
  createWaterRecord,
  deleteWaterRecord,
  getWaterRecord,
  updateWaterRecord,
} from '../services/water.js';

export async function createWaterRecordController(req, res) {
  const { volume, date } = req.body;
  const userId = req.user.id;
  const record = await getWaterRecord(userId, date);
  console.log('record', record);
  if (record) {
    throw new createHttpError(
      409,
      'the volume of water at this time has already been recorded',
    );
  }
  const result = await createWaterRecord({
    date,
    volume,
    userId,
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
  const { date } = req.body;
  console.log(id);
  console.log(date);

  const record = await deleteWaterRecord(id, date);
  if (!record) {
    throw new createHttpError.NotFound('water user record not found');
  }
  res.status(204).send();
}

export async function patchWaterRecordController(req, res) {
  const { id } = req.params;
  const { date, volume } = req.body;
  const updatedData = {
    data: date,
    volume: volume,
  };

  const result = await updateWaterRecord(id, updatedData);
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

//     const userId = req.user._id;
//     const { date } = req.params;

//     const user = await User.findById(userId);

//     if (!user) {
//       return next(HttpError(404, 'User not found'));
//     }

// };

// export const getMonthWaterController = async (req, res, next) => {
//   try {
//     const userId = req.user._id;
//     const user = await User.findById(userId);

//     if (!user) {
//       return next(HttpError(404, 'User not found'));
//     }

// };
