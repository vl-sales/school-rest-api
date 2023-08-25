import { Router } from 'express';
import upload from '../configs/uploadConfig';

const uploadRouter = new Router();
const uploadSingleImage = upload.single('file');

uploadRouter.post('/', (req, res) => {
  uploadSingleImage(req, res, function (err) {
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
});

export default uploadRouter;
