const express = require("express");
const router = express.Router();
const { ceb } = require("../middleware/EmptyBody");
const { privateAdminAuth } = require("../middleware/Auth");
const { uploadPic } = require("../helper/profilePicHelper");
const { branchValidate, adminReqValid, clusterHeadValidate, updateClusterValidate, adminValidate, updateBranchValidate, masterTableValidate, } = require("../middleware/Validators/adminValidator");
const { getBranches, getDropdownBranches, createBranch, getBranchDetail, updateBranch, branchStatusChange, } = require("../controller/AdminController/adminBranchController");
const { getAdmins, createAdmin, } = require("../controller/AdminController/adminController");
const { getClusterHeads, getClusterDetail, createClusterHead, updateCluster, updateClusterBranch, clusterStatusChange, } = require("../controller/AdminController/adminClusterController");
const {  createCountryLead, getCountryLeads, getCountryLeadDetail, updateCountryLead, countryLeadStatusChange } = require("../controller/AdminController/adminCountryLeadController.js");
const { commonTableValidate, managerReqValid, } = require("../middleware/Validators/managerValidator");
const { getUserLogs, addMasterStatus, updateMasterStatus, } = require("../controller/ManagerController/commonTables");
const { startMonth, getBranchTargets, getBranchTargetDetail, updateBranchTarget, adminGetTargets, adminGetBdTargets, AdminBDTargetDropdown, AdminCLTargetDropdown, AdminBranchTargetDropdown, AdminClusterTargetDropdown, } = require("../controller/AdminController/adminTargController");
const { getLeadFollowUpStatus, getMasterStatus, } = require("../controller/BDController/bdController");
const { getLeadCallStatus, getLeadCallType, } = require("../controller/BDController/bdCallController");
const { getLeadRFPStatus, getLeadRFPType, } = require("../controller/BDController/bdRFPController");
const { getLeadsControllers, getDuplicateLeadsControllers, deleteDuplicateLeadsControllers, updateLeadsControllers, updateLeadsStatusControllers, getDropdownLeadsControllers, getClusterLeadsDropdownControllers, getBDsDropdownControllers, getLeadActivityControllers, updateLeadActivityController, addCommentLeadActivityController, getLeadResponseControllers, getLeadFollowupCallController, getBranchesDropdownControllers, } = require("../controller/AdminController/adminLeadController");
const { adminAddCommentCallActivity, adminUpdateCallActivity, adminGetCallActivity, adminUpdateCall, adminGetLeadCalls, } = require("../controller/AdminController/adminBDCallsController.js");
const { adminGetRfp, adminGetRfpMom, adminUpdateRFP, adminUpdateRfpStatus, adminGetRFPActivities, adminUpdateRfpActivity, adminAddCommentRFPActivity, } = require("../controller/AdminController/adminBDRFPController");
const { adminGetProposal, adminUpdateProposal, } = require("../controller/AdminController/adminBDProposalController");
const { adminGetCLDSRReport, adminGetBDDSRReport, adminGetClusterDSRReport, adminGetLeadDataBank, adminAddBDsTarget, } = require("../controller/AdminController/AdminDSRController");
const { uploadAttachment } = require("../helper/attachmentHelper.js");
const { uploadFiles } = require("../helper/proposalDocHelper.js");
const { proposalValidate, bdReqValid } = require("../middleware/Validators/bdValidator.js");
const { uploadLeads } = require("../helper/leadUpload.js");

// Admin Routes
router.post("/create-admin", uploadPic, privateAdminAuth, adminValidate, adminReqValid, createAdmin);
router.get("/get-admins", privateAdminAuth, getAdmins);

// Branch Routes
router.post("/create-branch", ceb, privateAdminAuth, branchValidate, adminReqValid, createBranch);
router.get("/get-branches", privateAdminAuth, getBranches);
router.get("/get-branch-detail", privateAdminAuth, getBranchDetail);
router.put("/update-branch-detail", ceb, privateAdminAuth, updateBranchValidate, adminReqValid, updateBranch);
router.get("/get-dropdown-branches", privateAdminAuth, getDropdownBranches);
router.post("/branch-status-change", privateAdminAuth, branchStatusChange);

// Country-Lead Routes
router.post("/create-country-lead", uploadPic, ceb, privateAdminAuth, createCountryLead);
router.get("/get-country-leads", privateAdminAuth, getCountryLeads);
router.get("/get-country-lead-detail", privateAdminAuth, getCountryLeadDetail);
router.put("/update-country-lead-detail", uploadPic, ceb, privateAdminAuth, updateCountryLead);
router.post("/country-lead-status-change", privateAdminAuth, countryLeadStatusChange);

// Cluster Routes
router.post("/create-cluster-head", uploadPic, ceb, privateAdminAuth, clusterHeadValidate, adminReqValid, createClusterHead);
router.get("/get-cluster_heads", privateAdminAuth, getClusterHeads);
router.get("/get-cluster-detail", privateAdminAuth, getClusterDetail);
router.put("/update-cluster-detail", uploadPic, ceb, privateAdminAuth, updateClusterValidate, adminReqValid, updateCluster);
router.post("/cluster-status-change", privateAdminAuth, clusterStatusChange);
router.put("/update-cluster-branch", privateAdminAuth, updateClusterBranch);

// Manager Routes

// BD Routes

// Targets.
//Admin Target Actions.
router.post("/start-month", privateAdminAuth, startMonth);

// Branch Target Routes.
router.post("/admin-get-targets", privateAdminAuth, adminGetTargets);
router.get("/get-branch-targets", privateAdminAuth, getBranchTargets);
router.get("/admin-get-bd-targets", privateAdminAuth, adminGetBdTargets);
router.get("/get-branch-target-detail", privateAdminAuth, getBranchTargetDetail);
router.put("/update-branch-target", privateAdminAuth, updateBranchTarget);
router.post("/admin-dropdown-bd-target", privateAdminAuth, AdminBDTargetDropdown);
router.post("/admin-dropdown-cl-target", privateAdminAuth, AdminCLTargetDropdown);
router.post("/admin-dropdown-cluster-target", privateAdminAuth, AdminClusterTargetDropdown);
router.post("/admin-dropdown-branch-target", privateAdminAuth, AdminBranchTargetDropdown);

// Common Table Routes.
// Get Common Table Routes
router.get("/get-lead-followup-status", getLeadFollowUpStatus);
router.get("/get-lead-call-status", getLeadCallStatus);
router.get("/get-lead-call-type", getLeadCallType);
router.get("/get-lead-rfp-status", getLeadRFPStatus);
router.get("/get-lead-rfp-type", getLeadRFPType);
router.get("/get-master-status", getMasterStatus);

//Add Common Table Routes
router.post("/add-master-status", ceb, privateAdminAuth, masterTableValidate, adminReqValid, addMasterStatus);

// Update Common Table Routes.
router.put("/update-master-status", ceb, privateAdminAuth, updateMasterStatus); //masterTableValidate, adminReqValid,

// Get logs
router.get("/get-user-logs", privateAdminAuth, getUserLogs);

/** Lead Management */
router.get("/get-leads", privateAdminAuth, getLeadsControllers);
router.get("/get-duplicate-leads", privateAdminAuth, getDuplicateLeadsControllers);
router.delete("/delete-duplicate-lead", privateAdminAuth, deleteDuplicateLeadsControllers);
router.put("/update-lead", privateAdminAuth, updateLeadsControllers);
router.put("/update-lead-status", privateAdminAuth, updateLeadsStatusControllers);
router.get("/get-lead-dropdown", privateAdminAuth, getDropdownLeadsControllers);
router.get("/get-cluster-lead-dropdown", privateAdminAuth, getClusterLeadsDropdownControllers);
router.get("/get-bds-dropdown", privateAdminAuth, getBDsDropdownControllers);
router.get("/get-lead-activities", privateAdminAuth, getLeadActivityControllers);
router.put("/update-lead-activities", privateAdminAuth, updateLeadActivityController);
router.put("/add-comment-lead-activities", privateAdminAuth, addCommentLeadActivityController);
router.get("/get-lead-responses", privateAdminAuth, getLeadResponseControllers);
router.get("/get-lead-followup-call", privateAdminAuth, getLeadFollowupCallController);
router.get("/get-branch-dropdown", privateAdminAuth, getBranchesDropdownControllers);

/** lead Calls */
router.get("/get-lead-call", privateAdminAuth, adminGetLeadCalls);
router.put("/update-call", ceb, privateAdminAuth, adminUpdateCall); //updateManagerValidate, adminReqValid,
router.get("/get-call-activities", privateAdminAuth, adminGetCallActivity);
router.put("/update-call-activity", ceb, privateAdminAuth, adminUpdateCallActivity); //updateManagerValidate, adminReqValid,
router.put("/add-comment-call-activity", ceb, privateAdminAuth, adminAddCommentCallActivity);

//Admin RFP Management ////
// router.post('/add-rfp', uploadAttachment, ceb, privateClusterAuth, rfpValidate, bdReqValid, addRFP);
router.get("/get-rfp", privateAdminAuth, adminGetRfp);
router.put("/update-rfp", uploadAttachment, ceb, privateAdminAuth, adminUpdateRFP); //updateManagerValidate, clusterReqValid,
router.get("/get-rfp-mom", privateAdminAuth, adminGetRfpMom);
router.put("/update-rfp-status", ceb, privateAdminAuth, adminUpdateRfpStatus);
router.get("/get-rfp-activities", privateAdminAuth, adminGetRFPActivities);
router.put("/update-rfp-activity", ceb, privateAdminAuth, adminUpdateRfpActivity); //updateManagerValidate, clusterReqValid,
router.put("/add-comment-rfp-activity", ceb, privateAdminAuth, adminAddCommentRFPActivity); //updateManagerValidate, clusterReqValid,

// BH Proposal Proposal
// router.post('/add-proposal', uploadFiles, ceb, privateBDAuth, proposalValidate, bdReqValid, addProposal);
router.get("/get-proposal", privateAdminAuth, adminGetProposal);
router.put("/update-proposal", uploadFiles, ceb, privateAdminAuth, proposalValidate, bdReqValid, adminUpdateProposal);

/** DSR */
router.get("/get-cluster-dsr", privateAdminAuth, adminGetClusterDSRReport);
router.get("/get-cluster-leads-dsr", privateAdminAuth, adminGetCLDSRReport);
router.get("/get-bds-dsr", privateAdminAuth, adminGetBDDSRReport);
router.get("/get-leads-dsr", adminGetLeadDataBank);
router.post("/add-target", uploadLeads, adminAddBDsTarget);

module.exports = router;
