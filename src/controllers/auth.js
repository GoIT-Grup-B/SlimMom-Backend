import { registerUser } from '../services/auth';
export const registerUserController = async (req, res, next) => {
  const user = await registerUser(req.body);

  res.status(200).json({
    status: 200,
    message: 'Successfully registered a user!',
    data: user,
  });
};
