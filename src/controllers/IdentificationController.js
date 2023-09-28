import multer from 'multer';
import multerConfig from '../configs/uploadConfig';
import StudentIdentification from '../models/StudentIdentification';

class IdentificationController {
  constructor() {
    this.uploadSingleImage = multer(multerConfig).single('file');
  }

  store(req, res) {
    this.uploadSingleImage(req, res, async function (err) {
      if (err) {
        return res.status(400).json({ error: err.message });
      }

      try {
        const { file } = req;
        const { originalname, filename } = file;
        const { studentId } = req.params;

        if (!studentId) {
          return res.status(400).json({ error: 'Student id is required' });
        }

        await StudentIdentification.create({
          filename,
          originalname,
          student_id: Number(studentId),
        });

        return res.status(201).json({
          filename,
          originalname,
          mimetype: file.mimetype,
          size: file.size,
          fieldname: file.fieldname,
        });
      } catch (error) {
        res.status(400);

        if (error.name === 'SequelizeForeignKeyConstraintError') {
          return res.json({ error: 'User not exists' });
        }

        return res.json({ error: error.message });
      }
    });
  }
}

export default IdentificationController;
