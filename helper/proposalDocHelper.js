// middleware/uploadMiddleware.js
const multer = require("multer");
const path = require("path");
const ErrorHandler = require("../Utils/errorHandler");

const allowedFormats = ['pdf', 'doc', 'docx', 'xml', 'ppt', 'pptx', 'xls', 'xlsx', 'csv'];

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folderName = file.fieldname === 'proposal' ? 'proposal' : file.fieldname === 'wbs' ? 'wbs' : file.fieldname === 'wireframe' ? 'wireframe' : 'other_doc';
    // const destinationPath = path.join(__dirname, `../Uploads/${folderName}`);
    const destinationPath =  `Uploads/${folderName}/` //path.join(__dirname, `../Uploads/${folderName}`);
    cb(null, destinationPath);
  },
  filename: (req, file, cb) => {
    // const fileName = Date.now() + '-' + file.originalname;
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
  { name: 'proposal', maxCount: 5, required: false },
  { name: 'wbs', maxCount: 5, required: false },
  { name: 'wireframe', maxCount: 5, required: false },
  { name: 'other_doc', maxCount: 5, required: false }
]);

const uploadFiles = (req, res, next) => {
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

module.exports = { uploadFiles };
