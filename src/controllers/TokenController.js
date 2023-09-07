import jwt from 'jsonwebtoken';
import User from '../models/User';

class TokenController {
  async store(req, res) {
    const { email = '', password = '' } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        erro: 'Invalid credentials',
      });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ erro: 'User does not exist' });
    }

    if (!user.passwordIsValid(password)) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const { id } = user;
    const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });

    return res.json({ token });
  }
}

export default TokenController;
