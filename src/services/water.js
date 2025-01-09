import { WaterCollection } from '../models/water.js';

export async function createWaterRecord(record) {
  return WaterCollection.create(record);
}

export async function deleteWaterRecord(id, userId) {
  return WaterCollection.findOneAndDelete({
    _id: id,
    userId,
  });
}

export async function updateWaterRecord(id, userId, record) {
  return await WaterCollection.findOneAndUpdate({ _id: id, userId }, record, {
    new: true,
  });
}
