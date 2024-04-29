const express = require('express');
// const user = require('../controller/userController');
// const adminValidator = require('../middleware/validation');
const { uploadPic } = require('../helper/profilePicHelper');
const devAdmin = require('../controller/DevController/devController');
const { adminValidate, adminReqValid } = require('../middleware/Validators/adminValidator');

const router = express.Router();

router.post('/admin-create', uploadPic, adminValidate, adminReqValid, devAdmin.adminCreate);
router.get('/unique-id',  devAdmin.uniqueId);

module.exports = router;