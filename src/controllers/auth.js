import {registerUser,getUser,loginUser,refreshUser} from '../services/auth.js';
import createHttpError from "http-errors";
import { ONE_DAY } from '../constants/index.js';
import jwt from 'jsonwebtoken';
<<<<<<< HEAD
import { SessionCollection } from '../db/models/sessions.js';
=======
export const registerUserController = async(req, res, next)=>{
    try{
        const {name, email, password} = req.body;
        const user = await getUser(email);
>>>>>>> development

        if(user){
            return next(createHttpError(409,'Email in use'));
        }

        const newUser = await registerUser({name, email, password});
        console.log(newUser);
        const userwithoutpass = {...newUser};
        delete userwithoutpass.password;

        const token = jwt.sign({id:newUser._id},process.env.JWT_SECRET, { expiresIn: '7d' });

        res.status(201).json({
            status:201,
            message: "Successfully registered a user!",
            data: {
                id: userwithoutpass._doc._id,
                name: userwithoutpass._doc.name,
                email: userwithoutpass._doc.email,
                createdAt: userwithoutpass._doc.createdAt,
                updatedAt: userwithoutpass._doc.updatedAt,
            },
            token
        });
        
    }catch(error){
        next(createHttpError(500,error));
    }
};


<<<<<<< HEAD
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.status(201).json({
      status: 201,
      message: 'Successfully registered a user!',
=======
export const loginUserController =  async(req,res) =>{
    const session = await loginUser(req.body);
  
    res.cookie('refreshToken', session.refreshToken, {
      httpOnly: true,
      expires: new Date(Date.now() + ONE_DAY),
    });
    res.cookie('sessionId', session._id, {
      httpOnly: true,
      expires: new Date(Date.now() + ONE_DAY),
    });
  
    res.json({
      status: 200,
      message: 'Successfully logged in an user!',
>>>>>>> development
      data: {
        accessToken: session.accessToken,
      },
      token,
    });
  };

const setupSession = (res, session) => {
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });
};
<<<<<<< HEAD

export const refreshUserController = async (req, res, next) => {
  try {
    const session = await refreshUser({
      sessionId: req.cookies.sessionId,
      refreshToken: req.cookies.refreshToken,
    });
    console.log(session);
    console.log('Cookies:', req.cookies);
=======
>>>>>>> development

export const refreshUserController = async(req,res,next) =>{
    try{
      const session = await refreshUser({
        sessionId: req.cookies.sessionId,
        refreshToken: req.cookies.refreshToken,
      });
      console.log(session);
      console.log("Cookies:", req.cookies);
     
      setupSession(res, session);
        res.status(200).json({
            status: 200,
            message:"Successfully refreshed a session!",
            data:{ accessToken: session.accessToken,}

        });
    }catch(e){
        next(createHttpError(e.status||500,e.message));
    }
};
