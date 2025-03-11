import { Router } from 'express';

const authRouter = Router();

authRouter.post('/register', (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Lütfen tüm alanları doldurun!' });
  }

  res.status(201).json({
    message: 'Kullanıcı başarıyla kaydedildi!',
    user: { name, email },
  });
});

export default authRouter;
