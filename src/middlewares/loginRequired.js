import jwt from 'jsonwebtoken';
import User from '../models/User';

export default async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const [, token] = authorization.split(' ');

  try {
    const dados = jwt.verify(token, process.env.TOKEN_SECRET);
    const { id, email } = dados;

    const userExists = await User.findOne({
      where: { id, email },
    });

    if (!userExists) {
      return res.status(401).json({ error: 'invalid Token' });
    }

    req.userEmail = email;
    req.userId = id;
  } catch (error) {
    return res.status(401).json({ error: 'expired or invalid Token' });
  }

  return next();
};
