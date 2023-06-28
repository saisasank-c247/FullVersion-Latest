const multer = require("multer"); //multer is required for file upload
const path = require("path");
const { Messages, FileDirectoryPath } = require("../common");

// multer code
const storage = multer.diskStorage({
  destination: FileDirectoryPath.testUploadPath,
  filename: function (req, file, cb) {
    try {
      const fileName = file.originalname.replace(/[^A-Z0-9]/gi, "-");
      cb(null, fileName + "_" + Date.now() + path.extname(file.originalname));
    } catch (err) {
      res.status(500).json({
        status: false,
        message: Messages.SomethingWrong,
      });
    }
  },
});

exports.upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.fieldname === "files") {
      if (
        file.mimetype === "application/pdf" ||
        file.mimetype === "application/docx" ||
        file.mimetype === "application/doc" ||
        file.mimetype === "application/msword" ||
        file.mimetype === "image/png"
      ) {
        cb(null, true);
      } else {
        cb(null, false);
      }
    }
  },
});
