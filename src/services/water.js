import Users from '../models/users.js';
import { WaterCollection } from '../models/water.js';

export async function createWaterRecord(record) {
  return WaterCollection.create(record);
}

export async function getWaterRecord(id, date) {
  return WaterCollection.findOne({
    userId: id,
    date: date,
  });
}

export async function deleteWaterRecord(id, userId) {
  return WaterCollection.findOneAndDelete({
    _id: id,
    userId,
  });
}

export async function updateWaterRecord(id, userId, updatedData) {
  return await WaterCollection.findOneAndUpdate(
    { _id: id, userId },
    updatedData,
    {
      new: true,
    },
  );
}
export async function getUser(userId) {
  return await Users.findById(userId);
}

export async function getWaterDay(userId, date) {
  const startDay = date + 'S';

  let nextDay = new Date(date);
  nextDay.setDate(nextDay.getDate() + 1);
  nextDay = nextDay.toLocaleDateString('sv-SE');

  return await WaterCollection.find(
    {
      userId: userId,
      date: {
        $gt: startDay,
        $lt: nextDay,
      },
    },
    { _id: true, date: true, volume: true },
  ).sort({ date: 1 });
}

export async function getWaterMonth(userId, month) {
  let preMonth = new Date(
    Number(month.slice(0, 4)),
    Number(month.slice(5)) - 1,
    0,
  );
  preMonth = preMonth.toLocaleDateString('sv-SE').slice(0, 7);

  let nextMonth = new Date(
    Number(month.slice(0, 4)),
    Number(month.slice(5)),
    1,
  );
  nextMonth = nextMonth.toLocaleDateString('sv-SE').slice(0, 7);

  return await WaterCollection.find({
    userId: userId,
    date: {
      $gt: preMonth,
      $lt: nextMonth,
    },
  });
}
