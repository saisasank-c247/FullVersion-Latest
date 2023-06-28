import Jimp from "jimp"; //Jimp is required for file resize
const multer = require("multer"); //multer is required for file upload
const path = require("path");
const { Messages, FileDirectoryPath } = require("../common");

// Storing in the disk
const storage = multer.diskStorage({
  destination: FileDirectoryPath.moduleUploadPath,
  filename: function (req, file, cb) {
    try {
      cb(
        null,
        file.fieldname + "_" + Date.now() + path.extname(file.originalname)
      );
    } catch (err) {
      res.status(500).json({
        status: false,
        message: Messages.SomethingWrong,
      });
    }
  },
});

// Uploading the modules image
exports.UploadModuleImage = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.fieldname === "moduleImage") {
      if (
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/png" ||
        file.mimetype === "image/svg"
      ) {
        cb(null, true);
      } else {
        cb(null, false);
      }
    }
  },
});

// Resizing the uploaded image as in width, as we are using thumb image on front
export const resizeImage = async (sourcePath, moduleThumbDestination) => {
  const moduleThumbImage = await Jimp.read(sourcePath);
  moduleThumbImage
    .resize(269, 185, Jimp.AUTO)
    .quality(100)
    .write(moduleThumbDestination); // save
  return true;
};
