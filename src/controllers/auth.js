import {
  registerUser,
  getUser,
  loginUser,
  refreshUser,
} from '../services/auth.js';
import createHttpError from 'http-errors';
import { ONE_DAY } from '../constants/index.js';
import { SessionCollection } from '../db/models/sessions.js';

export const registerUserController = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user = await getUser(email);

    if (user) {
      return next(createHttpError(409, 'Email in use'));
    }

    const newUser = await registerUser({ name, email, password });
    console.log(newUser);
    const userwithoutpass = { ...newUser };
    delete userwithoutpass.password;

    res.status(201).json({
      status: 201,
      message: 'Successfully registered a user!',
      data: {
        id: userwithoutpass._doc._id,
        name: userwithoutpass._doc.name,
        email: userwithoutpass._doc.email,
        createdAt: userwithoutpass._doc.createdAt,
        updatedAt: userwithoutpass._doc.updatedAt,
      },
    });
  } catch (error) {
    next(createHttpError(500, error));
  }
};

export const loginUserController = async (req, res) => {
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
    data: {
      accessToken: session.accessToken,
    },
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
export const refreshUserController = async (req, res, next) => {
  try {
    const session = await refreshUser({
      sessionId: req.cookies.sessionId,
      refreshToken: req.cookies.refreshToken,
    });
    console.log(session);
    console.log('Cookies:', req.cookies);

    setupSession(res, session);
    res.status(200).json({
      status: 200,
      message: 'Successfully refreshed a session!',
      data: { accessToken: session.accessToken },
    });
  } catch (e) {
    next(createHttpError(e.status || 500, e.message));
  }
};

export const logoutUser = async (req, res, next) => {
  try {
    const token = req.token; // authenticate middleware'den gelen token
    if (!token) {
      return res
        .status(401)
        .json({ message: 'Yetkilendirme hatası: Token bulunamadı' });
    }

    const deletedSession = await SessionCollection.findOneAndDelete({
      accessToken: token,
    });

    if (!deletedSession) {
      return res.status(404).json({ message: 'Oturum bulunamadı' });
    }

    res.status(200).json({ message: 'Başarıyla çıkış yapıldı!' });
  } catch (error) {
    next(error);
  }
};
