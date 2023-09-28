const multer = require('multer');
const { resolve } = require('path');

const upload = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, resolve(__dirname, '..', '..', 'uploads', 'images'));
  },
  filename(req, file, cb) {
    const extArray = file.mimetype.split('/');
    const extension = extArray[extArray.length - 1];

    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;

    cb(null, `${uniqueSuffix}.${extension}`);
  },
});

export default {
  storage: upload,
  limits: { fileSize: 1.048576e6 * 3 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
      return cb(null, true);
    }
    return cb(new Error('Invalid mime type'));
  },
};
