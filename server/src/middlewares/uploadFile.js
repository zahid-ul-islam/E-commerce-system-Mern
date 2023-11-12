const multer = require("multer");


const {
  UPLOAD_FILE,
  MAX_FILE_SIZE,
  ALLOWED_FILE_EXTENTION,
} = require("../config/imageConfig");
const maxFileSize = MAX_FILE_SIZE;
const allowedFileExtension = ALLOWED_FILE_EXTENTION;
const storage = multer.memoryStorage();
const fileFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith("image/")) {
    return cb(new Error("only image files are allowed"), false);
  }
  if (file.size > maxFileSize) {
    return cb(new Error("file size exceeds the minimum limits"), false);
  }
  if (!allowedFileExtension.includes(file.mimetype)) {
    return cb(new Error("file extension is now allowed"), false);
  }
  cb(null, true);
};

const upload = multer({
  storage: storage,

  fileFilter: fileFilter,
});
module.exports = upload;
