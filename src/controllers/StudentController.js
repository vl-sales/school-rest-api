import Student from '../models/Student';

class StudentController {
  async index(req, res) {
    const students = await Student.findAll();
    return res.json(students);
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      const student = await this.#checkStudentExists(id);

      return res.json(student);
    } catch (error) {
      return res.status(400).json({ error: error?.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const student = await this.#checkStudentExists(id);

      student.destroy();
      return res.json({ deleted: true });
    } catch (error) {
      return res.status(400).json({ error: error?.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const student = await this.#checkStudentExists(id);

      const updatedStudent = await student.update(req.body);
      return res.json(updatedStudent);
    } catch (error) {
      return res.status(400).json({ error: error?.message });
    }
  }

  async store(req, res) {
    try {
      const student = await Student.create(req.body);
      return res.json(student);
    } catch (error) {
      return res.status(400).json({ error: error?.message });
    }
  }

  async #checkStudentExists(id) {
    if (!id) {
      throw new Error('Id is required');
    }

    const student = await Student.findByPk(id);
    if (!student) {
      throw new Error('Student not found');
    }

    return student;
  }
}

export default StudentController;
