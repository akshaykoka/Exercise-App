const multer = require("multer");
const path = require("path");
const { generateHash } = require("random-hash");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: async function (req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
      let err = new Error();
      err.code = "filetype";
      return cb(err);
    }
    let modFilename = generateHash({
      length: 20,
      charset:
        "ABCDEFGHIJKLMNOPQRSSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.",
    });
    modFilename += path.extname(file.originalname);
    cb(null, modFilename);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 262144 },
});

module.exports = upload;
