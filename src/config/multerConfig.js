const multer = require("multer");

const path = require("path");

exports.storage = multer.diskStorage({
  destination: (req, res, callback) => {
    callback(null, path.resolve("public"));
  },
  filename: (req, file, callback) => {
    const time = new Date().getTime();

    callback(null, `${time}_${file.originalname}`);
  },
});
