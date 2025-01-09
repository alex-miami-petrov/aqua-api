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

export const getUserByIdController = async (req, res) => {
  const { userId } = req.params;
  const user = await userService.getUserById(userId, req.user._id);

  if (!user) {
    throw new createHttpError.NotFound('User not found');
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found user with id ${userId}!`,
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

  const newUseer = await userService.addUser({
    ...userData,
    photo: photoUrl,
  });

  res.status(201).json({
    status: 201,
    message: 'Successfully created a user!',
    data: newUseer,
  });
};

export const patchUserController = async (req, res, next) => {
  const { userId } = req.params;
  const photo = req.file;

  let photoUrl;

  if (photo) {
    if (process.env.ENABLE_CLOUDINARY === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }

  // const updatedContact = await contactService.updateContact(
  //   contactId,
  //   req.body,
  //   req.user._id,
  // );

  // if (!updatedContact) {
  //   throw new createHttpError.NotFound('Contact not found');
  // }

  const updatedUser = await userService.updateUser(
    userId,
    {
      ...req.body,
      photo: photoUrl,
    },
    req.user._id,
  );

  if (!updatedUser) {
    next(createHttpError(404, 'User not found'));
    return;
  }

  res.status(200).json({
    status: 200,
    message: `Successfully updated the user!`,
    data: updatedUser,
  });
};

export const deleteUserController = async (req, res) => {
  const { userId } = req.params;
  const contact = await userService.deleteContact(userId, req.user._id);

  if (!contact) {
    throw new createHttpError.NotFound('User not found');
  }

  res.status(204).send();
};
