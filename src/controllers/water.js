import createHttpError from 'http-errors';

import {
  createWaterRecord,
  deleteWaterRecord,
  getUser,
  getWaterDay,
  getWaterMonth,
  getWaterRecord,
  updateWaterRecord,
} from '../services/water.js';

export async function createWaterRecordController(req, res) {
  const { volume, date } = req.body;
  const userId = req.user.id;

  const record = await getWaterRecord(userId, date);

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

  const result = await updateWaterRecord(id, userId, { ...req.body });
  if (!result) {
    throw new createHttpError.NotFound('water user record not found');
  }
  res.send({
    status: 200,
    message: `Successfully patched a water user record!`,
    data: result,
  });
}

export async function getDayWaterController(req, res) {
  const userId = req.user._id;
  const { date } = req.params;

  const user = await getUser(userId);
  if (!user) {
    throw new createHttpError(404, 'User not found');
  }
  const normaWater = user.waterNorma;

  const records = await getWaterDay(userId, date);

  const totalWaterDay = records
    .reduce((acc, record) => acc + record.volume, 0)
    .toFixed(2);

  const percent = Math.floor((totalWaterDay / normaWater) * 100);

  res.json({
    totalWaterDay,
    percent: percent >= 100 ? 100 : percent,
    records,
  });
}

export async function getMonthWaterController(req, res) {
  const { month } = req.params;
  const userId = req.user._id;
  const user = await getUser(userId);
  if (!user) {
    throw new createHttpError(404, 'User not found');
  }
  const normaWater = user.waterNorma;

  const waterRecords = await getWaterMonth(userId, month);

  const waterByDay = waterRecords.reduce((acc, record) => {
    const day = record.date.slice(0, 10);
    if (!acc[day]) {
      acc[day] = 0;
    }
    acc[day] += record.volume;
    return acc;
  }, {});

  const arrayWater = [];

  for (let i = 1; i <= 31; i++) {
    let day;
    if (i < 10) {
      day = '0' + String(i);
    } else {
      day = String(i);
    }
    day = month + '-' + day;
    const totalWaterDay = waterByDay[day] || 0;
    const percent = ((totalWaterDay / normaWater) * 100).toFixed(2);
    if (totalWaterDay > 0) {
      arrayWater.push({
        day: day,
        totalVolume: totalWaterDay.toFixed(2),
        percent: percent,
      });
    }
  }
  const totalWaterMonth = waterRecords.reduce(
    (sum, record) => sum + record.volume,
    0,
  );
  res.status(200).send({
    totalWaterMonth: totalWaterMonth.toFixed(2),
    arrayWater: arrayWater,
  });
}
