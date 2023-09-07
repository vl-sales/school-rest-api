import multer from 'multer';
import multerConfig from '../configs/uploadConfig';

class UploadController {
  constructor() {
    this.uploadSingleImage = multer(multerConfig).single('file');
  }

  store(req, res) {
    this.uploadSingleImage(req, res, function (err) {
      if (err) {
        return res.status(400).json({ error: err.message });
      }

      const { file } = req;
      return res.status(201).json({
        filename: file.filename,
        mimetype: file.mimetype,
        originalname: file.originalname,
        size: file.size,
        fieldname: file.fieldname,
      });
    });
  }
}

export default UploadController;
