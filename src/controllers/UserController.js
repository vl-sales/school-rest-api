import User from '../models/User';

class UserController {
  async create(req, res) {
    try {
      const newUser = await User.create(req.body);
      const { id, name, email } = newUser;
      res.json({ id, name, email });
    } catch (err) {
      res.status(400);
      res.json({ error: err.errors.map((error) => error.message)[0] });
    }
  }

  async update(req, res) {
    try {
      const user = await User.findByPk(req?.userId);
      if (!user) {
        return res.status(400).json({ error: 'User not found' });
      }

      await user.update(req.body);

      const { id, name, email } = req.body;
      return res.json({ id, name, email });
    } catch (error) {
      return res.json(null);
    }
  }

  async delete(req, res) {
    try {
      const user = await User.findByPk(req?.userId);
      if (!user) {
        return res.status(400).json({ error: 'User not found' });
      }

      await user.destroy();
      return res.json(null);
    } catch (error) {
      return res.json(error);
    }
  }
}

export default UserController;
