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

const addUser = async (userData) => {
  const newUser = await Users.create(userData);
  return newUser;
};

const updateUser = async (userId, payload) => {
  const updatedUser = await Users.findOneAndUpdate({ _id: userId }, payload, {
    new: true,
    runValidators: true,
  });

  return updatedUser;
};

const deleteUser = async (userId) => {
  const user = await Users.findOneAndDelete({ _id: userId });
  return user;
};

export default {
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
};
