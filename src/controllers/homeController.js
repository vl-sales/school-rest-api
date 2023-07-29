import Student from '../models/Student';

class HomeController {
  async index(req, res) {
    const newStudent = await Student.create({
      firstName: 'Vinicius',
      lastName: 'Sales',
      email: 'lande0600@gmail.com',
      age: 23,
      weight: 100,
      height: 1.9,
    });

    res.json(newStudent);
  }
}

export default new HomeController();
