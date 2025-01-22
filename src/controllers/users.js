import userService from '../services/users.js';
import createHttpError from 'http-errors';

import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
export const getUsersController = async (req, res) => {
  const usersCount = await userService.getAllUsers();

  res.status(200).json({
    status: 200,
    message: 'Successfully retrieved user count!',
    data: { usersCount },
  });
};

export const getCurrentUserController = async (req, res) => {
  const userId = req.user._id;

  const user = await userService.getUserById(userId);

  if (!user) {
    throw new createHttpError.NotFound('User not found');
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully retrieved the current user!',
    data: user,
  });
};

export const updateCurrentUserController = async (req, res, next) => {
  const userId = req.user._id;

  const photo = req.file;

  let photoUrl;
  if (photo) {
    try {
      if (process.env.ENABLE_CLOUDINARY === 'true') {
        photoUrl = await saveFileToCloudinary(photo);
      } else {
        photoUrl = await saveFileToUploadDir(photo);
      }
    } catch (error) {
      next(error);
      return;
    }
  }

  const updateData = {
    ...req.body,
    ...(photoUrl && { photo: photoUrl }),
  };

  try {
    const updatedUser = await userService.updateUser(userId, updateData);
    if (!updatedUser) {
      next(createHttpError(404, 'User not found'));
      return;
    }

    console.log('Updated User:', updatedUser);
    res.status(200).json({
      status: 200,
      message: 'Successfully updated the current user!',
      data: updatedUser,
    });
  } catch (error) {
    console.error('Error updating user:', error);
    next(error);
  }
};
