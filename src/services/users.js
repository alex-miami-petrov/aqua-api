import Users from '../models/users.js';

const getAllUsers = async ({ filter = {} } = {}) => {
  const usersCount = await Users.find({
    userId: filter.userId,
  }).countDocuments();

  return usersCount;
};

const getUserById = async (userId) => {
  const user = await Users.findOne({ _id: userId });
  return user;
};

const updateUser = async (userId, payload) => {
  const updatedUser = await Users.findOneAndUpdate({ _id: userId }, payload, {
    new: true,
    runValidators: true,
  });

  return updatedUser;
};

export default {
  getAllUsers,
  getUserById,

  updateUser,
};
