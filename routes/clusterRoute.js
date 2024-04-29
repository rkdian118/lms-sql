const express = require("express");
const router = express.Router();

const { ceb } = require("../middleware/EmptyBody");
const { privateClusterAuth } = require("../middleware/Auth");
const { uploadPic } = require("../helper/profilePicHelper");
const { createBD, getBDs, getbdDetail, updateBD, bdStatusChange, } = require("../controller/ClusterController/clusterBDController");
const { bdValidate, clusterReqValid, managerValidate, updateManagerValidate, updateBDValidate, clusterLeadValidate, updateClusterLeadValidate, } = require("../middleware/Validators/clusterValidator");
const cronHelper = require("../helper/cronHelper");
const { createclusterLead, getclusterLeads, getclusterLeadDetail, updateclusterLead, clusterLeadStatusChange, getDropdownclusterLeads, getDropdownBDEs, } = require("../controller/ClusterController/clusterLeadController");
const { getClusterLeadsTarget, getClusterLeadTargetDetail, updateClusterLeadTarget, chUpdateBDTarget, chCompBDTarget, chGetBDsTargets, bhGetTargets, bhAssignOldTargets, BDTargetDropdown, CLTargetDropdown, } = require("../controller/ClusterController/ClusterTargController");
const { getLeadsControllers, getDuplicateLeadsControllers, deleteDuplicateLeadsControllers, updateLeadsControllers, updateLeadsStatusControllers, getDropdownLeadsControllers, getClusterLeadsDropdownControllers, getBDsDropdownControllers, getLeadActivityControllers, updateLeadActivityController, addCommentLeadActivityController, getLeadResponseControllers, getLeadFollowupCallController, getAllLeadActivitiesControllers, transferLeadstoAnotherBDEController, getTransferLeadsController, } = require("../controller/ClusterController/leadsControllers");
const { clusterAddCommentCallActivity, clusterUpdateCallActivity, clusterGetCallActivity, clusterUpdateCall, clusterGetLeadCalls, } = require("../controller/ClusterController/cluBDCallsController");
const { getCLDSRReport, getBDDSRReport, getClusterDSRReport, getLeadDataBank, addBDsTarget, } = require("../controller/ClusterController/CluDSRController");
const { bhGetRfp, bhGetRfpMom, bhUpdateRFP, bhUpdateRfpStatus, bhGetRFPActivities, bhUpdateRfpActivity, bhAddCommentRFPActivity, } = require("../controller/ClusterController/clusterBDRFPController");
const { uploadAttachment } = require("../helper/attachmentHelper.js");
const { uploadFiles } = require("../helper/proposalDocHelper.js");
const { proposalValidate, bdReqValid, } = require("../middleware/Validators/bdValidator.js");
const { bhGetProposal, bhUpdateProposal, } = require("../controller/ClusterController/clusterBDProposalController");
const { uploadLeads } = require("../helper/leadUpload.js");
const { getClusterTargetGraphControllers, getClusterCardsDataController, getCLAndBDEPerformersController, getClusterDashBoardDSRController, } = require("../controller/ClusterController/clusterDashboardController.js");

// Cluster Routes.

// Manager Routes.
// router.post('/create-manager', uploadPic, ceb, privateClusterAuth, managerValidate, clusterReqValid, createManager);
// router.get("/get-managers", privateClusterAuth, getManagers);
// router.get("/get-manager-detail", privateClusterAuth, getManagerDetail);
// router.put("/update-manager-detail", uploadPic, ceb, privateClusterAuth, updateManagerValidate, clusterReqValid, updateManager);
// router.post("/manager-status-change", privateClusterAuth, managerStatusChange);

//Manager Targets Routes.
// router.post("/cron-assign-manager-targets", cronHelper.generateManagerTarget);
// router.post("/assign-manager-targets", privateClusterAuth, assignManagerTarget);
// router.get('/get-managers-targets', privateClusterAuth, getManagersTarget);
// router.get('/get-manager-target-detail', privateClusterAuth, getManagerTargetDetail);
// router.put('/update-manager-target', privateClusterAuth, updateManagerTarget);

// cluster-lead Routes.
router.post("/create-cluster-lead", uploadPic, ceb, privateClusterAuth, clusterLeadValidate, clusterReqValid, createclusterLead);
router.get("/get-cluster-leads", privateClusterAuth, getclusterLeads);
router.get("/get-cluster-lead-detail", privateClusterAuth, getclusterLeadDetail);
router.put("/update-cluster-lead-detail", uploadPic, ceb, privateClusterAuth, updateClusterLeadValidate, clusterReqValid, updateclusterLead);
router.post("/cluster-lead-status-change", privateClusterAuth, clusterLeadStatusChange);

//cluster-lead Targets Routes.
// router.post("/cron-assign-cluster-lead-targets", cronHelper.generatecluster-leadTarget);
router.get("/get-cluster-leads-targets", privateClusterAuth, getClusterLeadsTarget);
router.get("/get-cluster-lead-target-detail", privateClusterAuth, getClusterLeadTargetDetail);
router.put("/update-cluster-lead-target", privateClusterAuth, updateClusterLeadTarget);
// router.post("/assign-cluster-lead-targets", privateClusterAuth, assignClusterLeadTarget);

// router.post("/assign-manager-targets", privateClusterAuth, assignManagerTarget);

// Business Routes.
router.post("/create-bd", uploadPic, ceb, privateClusterAuth, bdValidate, clusterReqValid, createBD);
router.get("/get-bds", privateClusterAuth, getBDs);
router.get("/get-bd-detail", privateClusterAuth, getbdDetail);
router.put("/update-bd-detail", uploadPic, ceb, privateClusterAuth, updateBDValidate, clusterReqValid, updateBD);
router.post("/bd-status-change", privateClusterAuth, bdStatusChange);
// router.get("/get-dropdown-managers", privateClusterAuth, getDropdownManagers);
router.get("/get-dropdown-cluster-lead", privateClusterAuth, getDropdownclusterLeads);
router.post("/get-selected-bde-dropdown", privateClusterAuth, getDropdownBDEs);

//BD Target Routes.
router.get("/get-bds-targets", privateClusterAuth, chGetBDsTargets);
router.post("/get-targets", privateClusterAuth, bhGetTargets);
router.put("/update-bd-target", privateClusterAuth, chUpdateBDTarget);
router.put("/complete-bd-target", privateClusterAuth, chCompBDTarget);
router.post("/dropdown-bd-target", privateClusterAuth, BDTargetDropdown);
router.post("/dropdown-cl-target", privateClusterAuth, CLTargetDropdown);

// Assign Old Targets
router.post("/assign-old-targets", privateClusterAuth, bhAssignOldTargets);

/** Lead Management */
router.get("/get-leads", privateClusterAuth, getLeadsControllers);
router.get("/get-duplicate-leads", privateClusterAuth, getDuplicateLeadsControllers);
router.delete("/delete-duplicate-lead", privateClusterAuth, deleteDuplicateLeadsControllers);
router.put("/update-lead", privateClusterAuth, updateLeadsControllers);
router.put("/update-lead-status", privateClusterAuth, updateLeadsStatusControllers);
router.get("/get-lead-dropdown", privateClusterAuth, getDropdownLeadsControllers);
router.get("/get-cluster-lead-dropdown", privateClusterAuth, getClusterLeadsDropdownControllers);
router.get("/get-bds-dropdown", privateClusterAuth, getBDsDropdownControllers);
// router.get(
//   "/get-lead-activities",
//   privateClusterAuth,
//   getLeadActivityControllers
// );
router.get("/get-lead-activities", privateClusterAuth, getAllLeadActivitiesControllers);
router.put("/update-lead-activities", privateClusterAuth, updateLeadActivityController);
router.put("/add-comment-lead-activities", privateClusterAuth, addCommentLeadActivityController);
router.get("/get-lead-responses", privateClusterAuth, getLeadResponseControllers);
router.get("/get-lead-followup-call", privateClusterAuth, getLeadFollowupCallController);

/** lead Calls */
router.get("/get-lead-call", privateClusterAuth, clusterGetLeadCalls);
router.put("/update-call", ceb, privateClusterAuth, clusterUpdateCall); //updateManagerValidate, clusterReqValid,
router.get("/get-call-activities", privateClusterAuth, clusterGetCallActivity);
router.put("/update-call-activity", ceb, privateClusterAuth, clusterUpdateCallActivity); //updateManagerValidate, clusterReqValid,
router.put("/add-comment-call-activity", ceb, privateClusterAuth, clusterAddCommentCallActivity);

/** DSR */
router.get("/get-dsr", privateClusterAuth, getClusterDSRReport);
router.get("/get-cluster-leads-dsr", privateClusterAuth, getCLDSRReport);
router.get("/get-bds-dsr", privateClusterAuth, getBDDSRReport);
router.get("/get-leads-dsr", getLeadDataBank);
router.post("/add-target", uploadLeads, addBDsTarget);

//BH RFP Management
// router.post('/add-rfp', uploadAttachment, ceb, privateClusterAuth, rfpValidate, bdReqValid, addRFP);
router.get("/get-rfp", privateClusterAuth, bhGetRfp);
router.put("/update-rfp", uploadAttachment, ceb, privateClusterAuth, bhUpdateRFP); //updateManagerValidate, clusterReqValid,
router.get("/get-rfp-mom", privateClusterAuth, bhGetRfpMom);
router.put("/update-rfp-status", ceb, privateClusterAuth, bhUpdateRfpStatus);
router.get("/get-rfp-activities", privateClusterAuth, bhGetRFPActivities);
router.put("/update-rfp-activity", ceb, privateClusterAuth, bhUpdateRfpActivity); //updateManagerValidate, clusterReqValid,
router.put("/add-comment-rfp-activity", ceb, privateClusterAuth, bhAddCommentRFPActivity); //updateManagerValidate, clusterReqValid,

// BH Proposal Proposal
// router.post('/add-proposal', uploadFiles, ceb, privateBDAuth, proposalValidate, bdReqValid, addProposal);
router.get("/get-proposal", privateClusterAuth, bhGetProposal);
router.put("/update-proposal", uploadFiles, ceb, privateClusterAuth, proposalValidate, bdReqValid, bhUpdateProposal);

/** Branch head dashboard Routes */
router.get("/get-target-graph", privateClusterAuth, getClusterTargetGraphControllers);
router.get("/get-card-data", privateClusterAuth, getClusterCardsDataController);
router.get("/get-performers", privateClusterAuth, getCLAndBDEPerformersController);
router.get("/get-dashboard-dsr", privateClusterAuth, getClusterDashBoardDSRController);

router.post("/transfer-leads", privateClusterAuth, transferLeadstoAnotherBDEController);

router.get("/get-transfer-leads", privateClusterAuth, getTransferLeadsController);

module.exports = router;
