import { SORT_ORDER } from '../constans/index.js';
import Users from '../models/users.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

// const clearFilter = (filter) => {
//   return Object.fromEntries(
//     Object.entries(filter).filter(([_, value]) => value !== undefined),
//   );
// };

const getAllUsers = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
}) => {
  const limit = perPage;
  const skip = page > 0 ? (page - 1) * perPage : 0;

  const usersQuery = Users.find({ userId: filter.userId });

  if (filter.name) {
    usersQuery.where('name').regex(new RegExp(filter.name, 'i'));
  }
  if (filter.gender) {
    usersQuery.where('gender').regex(new RegExp(filter.gender));
  }
  // if (filter.email) {
  //   contactsQuery.where('email').regex(new RegExp(filter.email, 'i'));
  // }
  // if (filter.isFavourite !== undefined) {
  //   contactsQuery.where('isFavourite').equals(filter.isFavourite);
  // }
  // if (filter.contactType) {
  //   contactsQuery.where('contactType').equals(filter.contactType);
  // }

  const [usersCount, users] = await Promise.all([
    Users.find().merge(usersQuery).countDocuments(),
    usersQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);

  const paginationData = calculatePaginationData(usersCount, perPage, page);
  return {
    data: users,
    ...paginationData,
  };
};

const getUserById = async (customerId, userId) => {
  const user = await Users.findOne({ _id: customerId, userId });
  return user;
};

const addUser = async (userData) => {
  const newUser = await Users.create(userData);
  return newUser;
};

const updateUser = async (customerId, payload, userId) => {
  const updatedUser = await Users.findOneAndUpdate(
    { _id: customerId, userId },
    payload,
    {
      new: true,
      runValidators: true,
    },
  );

  return updatedUser;
};

const deleteUser = async (customerId, userId) => {
  const user = await Users.findOneAndDelete({ _id: customerId, userId });
  return user;
};

export default {
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
};
