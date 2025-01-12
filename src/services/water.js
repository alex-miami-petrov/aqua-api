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

export async function deleteWaterRecord(id, date) {
  return WaterCollection.findOneAndDelete({
    userId: id,
    date: date,
  });
}

export async function updateWaterRecord(id, updatedData) {
  return await WaterCollection.findOneAndUpdate(id, updatedData, { new: true });
}
