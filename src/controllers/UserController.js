import User from '../models/User';

class UserController {
  async create(req, res) {
    try {
      const newUser = await User.create(req.body);

      res.json(newUser);
    } catch (err) {
      res.status(400);
      res.json({
        error: err.errors.map((error) => error.message)[0],
      });
    }
  }

  async index(req, res) {
    try {
      const users = await User.findAll();
      return res.json(users);
    } catch (error) {
      return res.json(null);
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);

      return res.json(user);
    } catch (error) {
      return res.json(null);
    }
  }

  async update(req, res) {
    try {
      if (!req?.params?.id) {
        return res.status(400).json({
          error: 'Id is required',
        });
      }

      const user = await User.findByPk(req?.params?.id);
      if (!user) {
        return res.status(400).json({
          error: 'User not found',
        });
      }

      return res.json(await user.update(req.body));
    } catch (error) {
      return res.json(null);
    }
  }

  async delete(req, res) {
    try {
      if (!req?.params?.id) {
        return res.status(400).json({
          error: 'Id is required',
        });
      }

      const user = await User.findByPk(req?.params?.id);
      if (!user) {
        return res.status(400).json({
          error: 'User not found',
        });
      }

      await user.destroy();
      return res.json(user);
    } catch (error) {
      return res.json(null);
    }
  }
}

export default new UserController();
