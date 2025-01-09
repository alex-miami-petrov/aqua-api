import userService from '../services/users.js';
import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
// import { parseUserFilterParams } from '../utils/parseFilterParams.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';

export const getUsersController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);

  const { sortBy, sortOrder } = parseSortParams(req.query);

  // const filter = {
  //   ...parseUserFilterParams(req.query),
  //   userId: req.user._id,
  // };

  const users = await userService.getAllUsers({
    page,
    perPage,
    sortBy,
    sortOrder,
    // filter,
  });
  res.status(200).json({
    status: 200,
    message: 'Successfully found users!',
    data: users,
  });
};

export const getCurrenttUserController = async (req, res) => {
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

export const createUserController = async (req, res) => {
  const userData = { ...req.body, userId: req.user._id };
  const photo = req.file;

  let photoUrl;

  if (photo) {
    if (process.env.ENABLE_CLOUDINARY === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }

  const newUser = await userService.addUser({
    ...userData,
    photo: photoUrl,
  });

  res.status(201).json({
    status: 201,
    message: 'Successfully created a user!',
    data: newUser,
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

export const deleteUserController = async (req, res) => {
  const { customerId } = req.params;
  const contact = await userService.deleteContact(customerId, req.user._id);

  if (!contact) {
    throw new createHttpError.NotFound('User not found');
  }

  res.status(204).send();
};
