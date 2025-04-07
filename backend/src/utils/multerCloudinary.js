import multer from "multer";

function fileUpload() {
  const storage = multer.diskStorage({});
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
