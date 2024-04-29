const express = require('express');
const router = express.Router();

const { ceb } = require('../middleware/EmptyBody');
const { privateManagerAuth} = require('../middleware/Auth');
const { uploadPic } = require('../helper/profilePicHelper');
const { managerValidate, clusterReqValid } = require('../middleware/Validators/clusterValidator');
const { createManager } = require('../controller/ClusterController/clusterManagerController');
const { getManagerBDs, getManagerBDDetail } = require('../controller/ManagerController/managerBDController');
const { generateBDTarget } = require('../helper/cronHelper');
const { getBDsTarget, getBDTargetDetail, updateBDTarget, assignBDTarget, manCompBDTarget } = require('../controller/ManagerController/manBDTargController');
const { manGetCLsTarget, manGetCLTargetDetail, manUpdateCLTarget, manCompCLTarget } = require('../controller/ManagerController/manCLTargController');

router.post('/create-manager', uploadPic, ceb, privateManagerAuth, managerValidate, clusterReqValid, createManager);

// BD Routes.
router.get('/get-bds-list', privateManagerAuth, getManagerBDs);
router.get('/get-bd-detail', privateManagerAuth, getManagerBDDetail);

//BD Targets routes.
// router.post("/cron-assign-bd-targets", generateBDTarget);
// router.post("/assign-bd-targets", privateManagerAuth, assignBDTarget);
router.get('/get-bds-targets', privateManagerAuth, getBDsTarget);
router.get('/get-bd-target-detail', privateManagerAuth, getBDTargetDetail);
router.put('/update-bd-target', privateManagerAuth, updateBDTarget);
router.put('/complete-bd-target', privateManagerAuth, manCompBDTarget);

// Cluster Lead Targets.
router.get('/get-cls-targets', privateManagerAuth, manGetCLsTarget);
router.get('/get-cl-target-detail', privateManagerAuth, manGetCLTargetDetail);
router.put('/update-cl-target', privateManagerAuth, manUpdateCLTarget);
// router.put('/complete-cl-target', privateManagerAuth, manCompCLTarget);

module.exports = router;