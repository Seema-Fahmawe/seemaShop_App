import multer from "multer";
import { nanoid } from "nanoid";

import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
const _dirname = path.dirname(fileURLToPath(import.meta.url));
function fileUpload(customPath = "public") {
  const fullPath = path.join(_dirname, `../uploads/${customPath}`);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
  }
  const storage = multer.diskStorage({
    destination: (req, res, cb) => {
      cb(null, fullPath);
    },
    filename: (req, file, cb) => {
      const uniqueName = Date.now() + nanoid();
      cb(null, uniqueName + "_" + file.originalname);
    },
  });
  function fileFilter(req, file, cb) {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb("invalid format", false);
    }
  }
  const upload = multer({ fileFilter, storage });
  return upload;
}
export default fileUpload;
