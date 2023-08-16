import Student from '../models/Student';

class StudentController {
  async index(req, res) {
    const students = await Student.findAll();
    return res.json(students);
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ error: 'Id is required' });
      }

      const student = await Student.findByPk(id);
      if (!student) {
        return res.status(400).json({ error: 'Student not found' });
      }

      return res.json(student);
    } catch (error) {
      return res.status(400).json({ error: error?.message });
    }
  }
}

export default new StudentController();
