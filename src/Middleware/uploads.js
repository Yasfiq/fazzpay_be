/* eslint-disable no-unused-vars */
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinaryUpload = require("../helpers/cloudinary");
const path = require("path");

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "public/uploads");
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

// const uploads = multer({
//   storage: storage,
// });

// module.exports = uploads;

const storageOnline = new CloudinaryStorage({
  cloudinary: cloudinaryUpload,
  params: {
    folder: "funpayz",
    format: async (req, file) => "webp",
    public_id: (req, file) => new Date().getTime(),
  },
});

const formUploadOnline = multer({
  storage: storageOnline, //test bisa atau ga
  fileFilter: (req, file, cb) => {
    //console.log(file);
    let formatType = path.extname(file.originalname);
    if (
      formatType == ".png" ||
      formatType == ".jpg" ||
      formatType == ".jpeg" ||
      formatType == ".webp"
    ) {
      cb(null, true);
    } else {
      cb("Format file is not supported!", false);
    }
  },
  // limits: {
  //   fileSize: 1048576 * 5, //2 mb
  // },
});

module.exports = formUploadOnline;
