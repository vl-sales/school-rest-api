import User from '../models/User';

class HomeController {
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
}

export default new HomeController();
