import bcrypt from 'bcrypt';
import { UserCollection } from '../db/models/users.js';
import { SessionCollection } from '../db/models/sessions.js';
import createHttpError from 'http-errors';

export const registerUser = async (payload) => {
  try{
    const user = await UserCollection.findOne({ email: payload.email });
    if (user) throw createHttpError(409, 'email in use');
    const encryptedPassword = await bcrypt.hash(payload.password, 10);
    const createdUser =  await UserCollection.create({
      ...payload,
      password: encryptedPassword,
    });
  return createdUser;
  }catch(e){
      throw createHttpError(e.status || 500, e.message || "Failed to create user");
  }

};


export const getUser= async(email) =>{  
  try{
      const userAuth = await SessionCollection.findOne({email:email});
      return userAuth;
  }catch(e){
      throw new Error("Failed to fetch users",e);
  }

};

