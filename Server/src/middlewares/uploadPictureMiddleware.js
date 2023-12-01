import multer from "multer";
import path from "path";
import CustomError from "../utils/CustomError.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
    // cb(null, `${Date.now()}${file.originalname}`);
  },
});
export const uploadPicture = multer({
  storage: storage,
  limits: {
    fileSize: 1 * 1000000, // 1MB,
  },
  fileFilter: function (req, file, cb) {
    let ext = path.extname(file.originalname);
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg") {
      return cb(new CustomError("Only images are allowed", 400));
    }
    cb(null, true);
  },
});
