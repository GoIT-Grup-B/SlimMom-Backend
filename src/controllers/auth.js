import { registerUser } from '../services/auth.js';
import createHttpError from 'http-errors';
import { SessionCollection } from '../db/models/sessions.js';

export const registerUserController = async (req, res, next) => {
  const user = await registerUser(req.body);

  res.status(200).json({
    status: 200,
    message: 'Successfully registered a user!',
    data: user,
  });
};

export const logoutUserController = async (req, res, next) => {
  try {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
      return next(createHttpError(401, 'Authorization header is missing'));
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return next(createHttpError(401, 'Invalid token format'));
    }

    const session = await SessionCollection.findOne({ accessToken: token });
    if (!session) {
      return next(createHttpError(401, 'Session not found'));
    }

    await SessionCollection.deleteOne({ accessToken: token });

    res.status(200).json({
      status: 200,
      message: 'User logged out successfully!',
    });
  } catch (error) {
    console.error('Logout Error:', error);
    next(createHttpError(500, 'Server error'));
  }
};
