import multer from 'multer';
import { cleanNameFile } from '../utils/helpers.js';
import { development } from '../config/site.config.js';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, development['PUBLIC']);
  },
  filename: (req, file, cb) => {
    const { originalname } = file;
    cb(null, cleanNameFile(originalname));
  },
});
export const upload = multer({ storage });
