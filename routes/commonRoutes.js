const express = require('express');
const router = express.Router();

const passport = require('passport');
const { ceb } = require('../middleware/EmptyBody');
const { tempAdminAuth, privateUserAuth} = require('../middleware/Auth');
// const userController = require('../controller/userController');
// const { getRequirementTypes, getLeadType, getCallType, getLeadSource, getCallMode, getProposalType, getPreDefNotes } = require('../controller/ManagerController/commonTables');
const { uploadPic } = require('../helper/profilePicHelper');
const { updateProfileValidate, commonReqValid } = require('../middleware/Validators/commonValidator');
const { loginController, verifySecretKeyController, getUserProfile, updateUserProfile, getBranches, updateUserPassword, updateUsername } = require('../controller/userController');
require("../middleware/passports")(passport)

// Common User Routes
router.post('/login', ceb, loginController );
router.post('/verify-secret-key', ceb, tempAdminAuth, verifySecretKeyController )//admin.verifySecretKey)
router.post('/profile', privateUserAuth, getUserProfile);
router.put('/update-profile', uploadPic, ceb, privateUserAuth, updateProfileValidate, commonReqValid, updateUserProfile);
router.get('/get-branches', getBranches);
router.put('/update-password', ceb, privateUserAuth, updateUserPassword )
router.put('/update-username', ceb, privateUserAuth, updateUsername )

// Common Tables
// router.get('/get-req-type', getRequirementTypes);
// router.get('/get-lead-type', getLeadType);
// router.get('/get-call-type', getCallType);
// router.get('/get-lead-source', getLeadSource);
// router.get('/get-call-mode', getCallMode);
// router.get('/get-proposal-type', getProposalType);
// router.get('/get-pre-define-notes', getPreDefNotes);


module.exports = router;