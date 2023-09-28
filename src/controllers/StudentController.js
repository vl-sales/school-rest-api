import Student from '../models/Student';
import StudentIdentification from '../models/StudentIdentification';

class StudentController {
  async index(req, res) {
    const students = await Student.findAll({
      attributes: ['id', 'firstName', 'lastName', 'email', 'age'],
      order: [['id', 'DESC'], [StudentIdentification, 'id', 'DESC']],
      include: {
        model: StudentIdentification,
        attributes: ['filename', 'url'],
      },
    });

    return res.json(students);
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      const student = await this.#returnStudentIfExists(id);

      return res.json(student);
    } catch (error) {
      return res.status(400).json({ error: error?.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const student = await this.#returnStudentIfExists(id);

      student.destroy();
      return res.json({ deleted: true });
    } catch (error) {
      return res.status(400).json({ error: error?.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const student = await this.#returnStudentIfExists(id);

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

  async #returnStudentIfExists(id) {
    if (!id) {
      throw new Error('Id is required');
    }

    const student = await Student.findByPk(id, {
      attributes: ['id', 'firstName', 'lastName', 'email', 'age'],
      order: [[StudentIdentification, 'id', 'DESC']],
      include: {
        model: StudentIdentification,
        attributes: ['filename', 'url'],
      },
    });

    if (!student) {
      throw new Error('Student not found');
    }

    return student;
  }
}

export default StudentController;
