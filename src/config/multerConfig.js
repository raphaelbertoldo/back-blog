const { existsSync, mkdirSync } = require("fs");
const multer = require("multer");
const { join } = require("path");

const path = require("path");

exports.storage = multer.diskStorage({
  destination: (req, res, callback) => {
    const uploadDir = join(__dirname, "..", "..", "public");
    if (!existsSync(uploadDir)) {
      mkdirSync(uploadDir, { recursive: true });
    }

    callback(null, path.resolve("public"));
  },
  filename: (req, file, callback) => {
    const time = new Date().getTime();

    callback(null, `${time}_${file.originalname}`);
  },
});
