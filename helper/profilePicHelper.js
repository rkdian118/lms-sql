const multer = require("multer");
const path = require("path");
const ErrorHandler = require("../Utils/errorHandler");

const profilePicFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png/;
  const mimetype = filetypes.test(file.mimetype);
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // return cb(null,true);
  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Only jpg|jpeg|png files are allowed!'));
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {    //cb = call back
    cb(null, 'Uploads/profilePics/');
  },
  filename: (req, file, cb) => {
    const fileName = new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname;
    cb(null, fileName)
  }
});

const uploadProfilePic = multer({
  storage: storage, limits: {
    fileSize: 5 * 1024 * 1024,
  }, fileFilter: profilePicFilter
})  //{storage: storage, fileFilter: docFilter});




const uploadPic = (req, res, next) => {
  uploadProfilePic.single('profile_pic')(req, res, (error) => {
    if (error) {
      // Handle Multer errors
      if (error.code === 'LIMIT_FILE_SIZE') {
        return next(new ErrorHandler('File size exceeds the allowed limit of 5MB!', 400, error));
        // return res.json({ "ResponseCode": 400, "ResponseMessage": 'File size exceeds the allowed limit of 5MB!', "succeeded": false, "ResponseBody": error })
      }
      if (error.code === 'ENOENT') {
        return next(new ErrorHandler('No directry found for upload profile pic.', 400, error));
        // return res.json({ "ResponseCode": 400, "ResponseMessage": 'No directry found for upload profile pic.', "succeeded": false, "ResponseBody": error })
      }
      if (error.code === 'LIMIT_UNEXPECTED_FILE') {
        return next(new ErrorHandler('Please upload single profile picture.', 400, error));
        // return res.json({ "ResponseCode": 400, "ResponseMessage": 'Please upload single profile picture.', "succeeded": false, "ResponseBody": error })
      }
      if (error.name === 'Error') {
        return next(new ErrorHandler(error.message, 400, error));
        // return res.json({ "ResponseCode": 400, "ResponseMessage": error.message, "succeeded": false, "ResponseBody": error })
      }
      return next(new ErrorHandler("Something wents wrong when upload profile picture.", 400, error));
      // return res.json({ "ResponseCode": 400, "ResponseMessage": "Something wents wrong when upload profile picture.", "succeeded": false, "ResponseBody": error })
    }
    // if (!req.file || req?.body?.profile_pic == "") {
    //   return next(new ErrorHandler("Profile picture not found.", 400, {}));
    //   // return res.json({ "ResponseCode": 400, "ResponseMessage": "Profile picture not found.", "succeeded": false, "ResponseBody": {} })
    // }

    // Check if files were uploaded for the required fields

    // Move the uploaded files to the desired destination
    // ...

    next()
  });
};

module.exports = { uploadPic };

// module.exports = uploadDoc;