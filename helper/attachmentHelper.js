// middleware/uploadMiddleware.js
const multer = require("multer");
const path = require("path");
const ErrorHandler = require("../Utils/errorHandler");

const allowedFormats = ['pdf', 'doc', 'docx', 'xml', 'ppt', 'pptx', 'xls', 'xlsx', 'csv'];

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folderName = 'attachments';//file.fieldname === 'proposal' ? 'proposal' : file.fieldname === 'wbs' ? 'wbs' : 'wireframe';
    const destinationPath =  `Uploads/${folderName}/` //path.join(__dirname, `../Uploads/${folderName}`);
    cb(null, destinationPath);
  },
  filename: (req, file, cb) => {
    const fileName = new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname  //Date.now() + '-' + file.originalname;
    cb(null, fileName)
  }
});

const uploadMiddleware = multer({
  storage: storage,
  limits: {
    fileSize: 50 * 1024 * 1024, // 5MB per file
  },
  fileFilter: (req, file, cb) => {
    const extname = path.extname(file.originalname).toLowerCase();
    if (allowedFormats.includes(extname.slice(1))) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF, DOC, DOCX, XML, PPT, PPTX, XLS, XLSX, and CSV files are allowed!'));
    }
  },
}).fields([
  { name: 'attachment', maxCount: 5, required: false },
  // { name: 'wbs', maxCount: 5, required: false },
  // { name: 'wireframe', maxCount: 5, required: false }
]);

const uploadAttachment = (req, res, next) => {
  uploadMiddleware(req, res, (error) => {
      if (error) {
            // Handle Multer errors
            if (error.code === 'LIMIT_FILE_SIZE') {
                return next(new ErrorHandler(`${error.field} file size exceeds the allowed limit of 50MB!`, 400, error));
            }
            if (error.code === 'ENOENT') {
                return next(new ErrorHandler(`No directry found for upload ${error.field} files.`, 400, error));
            }
            if (error.code === 'LIMIT_UNEXPECTED_FILE') {
                return next(new ErrorHandler(`Please upload max 5 ${error.field} attachments.`, 400, error));
            }
            if (error.name === 'Error') {
                return next(new ErrorHandler(error.message, 400, error));
            }
            return next(new ErrorHandler(`Something wents wrong when upload ${error.field}.`, 400, error));
        }
    next();
  });
};

module.exports = { uploadAttachment };


// const multer = require("multer");
// const path = require("path");
// const ErrorHandler = require("../Utils/errorHandler");

// const docFilter = (req, file, cb) => {
//   const filetypes = /pdf|jpg|jpeg|png/;
//   const mimetype = filetypes.test(file.mimetype);
//   const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//   // return cb(null,true);
//   if (extname && mimetype) {
//     cb(null, true);
//   } else {
//     cb(new Error('Only PDF, JPG, JPEG, and PNG files are allowed!'));
//   }
// };

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {    //cb = call back
//     cb(null, 'Uploads/attachments/');
//   },
//   filename: (req, file, cb) => {
//     const fileName = new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname;
//     cb(null, fileName)
//   }
// });

// const uploadDoc = multer({
//   storage: storage, 
//   limits: {
//     fileSize: 5 * 1024 * 1024,
//   }, 
//   fileFilter: docFilter
// })  //{storage: storage, fileFilter: docFilter});


// const uploadAttachment = (req, res, next) => {
//   uploadDoc.fields([ 
//     { name: 'attachment', maxCount: 5 },
//   ])(req, res, (error) => {
//     if (error) {
//         // Handle Multer errors
//         if (error.code === 'LIMIT_FILE_SIZE') {
//           return next(new ErrorHandler('File size exceeds the allowed limit of 5MB!', 400, error));
//         }
//         if (error.code === 'ENOENT') {
//           return next(new ErrorHandler('No directry found for upload attachment.', 400, error));
//         }
//         if (error.code === 'LIMIT_UNEXPECTED_FILE') {
//           return next(new ErrorHandler('Please upload max 5 attachments.', 400, error));
//         }
//         if (error.name === 'Error') {
//           return next(new ErrorHandler(error.message, 400, error));
//         }
//         return next(new ErrorHandler("Something wents wrong when upload attachment.", 400, error));
//       }
//       if (!req.files) {
//         return next(new ErrorHandler("Attachments not found.", 400, error));
//       // return res.json({ "ResponseCode": 400, "ResponseMessage": "Attachments not found.", "succeeded": false, "ResponseBody": {} })
//     }

//     // Check if files were uploaded for the required fields
//     const { attachment } = req.files;
//     if (!attachment) {
//       return next(new ErrorHandler("Please upload attachment.", 400, error));
//       // return res.json({ "ResponseCode": 400, "ResponseMessage": "Please upload attachment.", "succeeded": false, "ResponseBody": {} })
//     }

//     // Move the uploaded files to the desired destination
//     // ...

//     next()
//   });
// };

// module.exports = { uploadAttachment };

// // module.exports = uploadDoc;