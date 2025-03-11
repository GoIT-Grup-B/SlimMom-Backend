import bcrypt from 'bcrypt';
import { UserCollection } from '../db/models/users.js';
import createHttpError from 'http-errors';

export const registerUser = async (payload) => {
  const user = UserCollection.findOne({ email: payload.email });
  if (user) throw createHttpError(409, 'email in use');

  const encryptedPassword = bcrypt.hash(payload.password, 10);
  return await UserCollection.create({
    ...payload,
    password: encryptedPassword,
  });
};
