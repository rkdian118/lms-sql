const express = require("express");
const router = express.Router();
const { ceb } = require("../middleware/EmptyBody");
const { privateBDAuth } = require("../middleware/Auth");
const {
  leadValidate,
  bdReqValid,
  callValidate,
  rfpValidate,
  proposalValidate,
} = require("../middleware/Validators/bdValidator");
const {
  addLead,
  getLeads,
  updateLead,
  getLeadFollowUpStatus,
  updateLeadActivity,
  addCommentLeadActivity,
  getLeadActivity,
  getAllActivities,
  getDropdownLeads,
  updateLeadStatus,
  getAllLeadCounts,
  addLeadFollowupCall,
  getLeadFollowupCall,
  addLeadResponse,
  getLeadResponse,
  uploadLead,
  uploadLeadUpdateController,
  createManualDsr,
  updateFollowupDates,
  getAllLeadActivities,
  updateProjectionStatus,
} = require("../controller/BDController/bdController"); //addCall, addRFP, getRfp, addProposal, getProposal,
const { uploadAttachment } = require("../helper/attachmentHelper");
const { uploadFiles } = require("../helper/proposalDocHelper");
const { uploadLeads } = require("../helper/leadUpload");
const {
  addCall,
  getLeadCalls,
  getCallActivity,
  updateCallActivity,
  addCommentCallActivity,
  updateCall,
  getAllCallCounts,
} = require("../controller/BDController/bdCallController");
const {
  addRFP,
  getRfp,
  getRFPActivities,
  addCommentRFPActivity,
  updateRfpActivity,
  updateRFP,
  getRfpMom,
  updateRfpStatus,
  updateRFPProposalValue,
} = require("../controller/BDController/bdRFPController");
const {
  addProposal,
  getProposal,
  updateProposal,
} = require("../controller/BDController/bdProposalController");
const {
  getDashFollowupLeads,
  getDashboard,
  getDashCallLeads,
  getDashRfpLeads,
  getLeadDetails,
  getCallDetails,
  getRfpDetail,
  getDashboardGraph,
  updateFollowupDate,
} = require("../controller/BDController/bdDashController");
const {
  getDSRReport,
  getDSRReportDetails,
  updateDSRReport,
} = require("../controller/BDController/bdDSRController");
const { getTargets } = require("../controller/BDController/bdTargController");

// Dashboard Routes
router.get("/dashboard", privateBDAuth, getDashboard);
router.get("/dashboard-graph", privateBDAuth, getDashboardGraph);
router.get("/dashboard-followup-leads", privateBDAuth, getDashFollowupLeads);
router.put("/update-followup-date", privateBDAuth, updateFollowupDate);
router.get("/dashboard-call-leads", privateBDAuth, getDashCallLeads);
router.get("/dashboard-rfp-leads", privateBDAuth, getDashRfpLeads);
router.get("/get-lead-details", privateBDAuth, getLeadDetails);
router.get("/get-call-details", privateBDAuth, getCallDetails);
router.get("/get-rfp-details", privateBDAuth, getRfpDetail);

// Target Routes.
router.post("/get-targets", privateBDAuth, getTargets);

// Add Lead
router.post("/add-lead", ceb, privateBDAuth, addLead); // leadValidate, bdReqValid,
router.get("/get-leads", privateBDAuth, getLeads);
router.get("/get-dropdown-leads", privateBDAuth, getDropdownLeads);
router.put("/update-lead", ceb, privateBDAuth, updateLead); //updateManagerValidate, clusterReqValid,
router.put("/update-lead-status", ceb, privateBDAuth, updateLeadStatus);
router.put(
  "/update-projection-status",
  ceb,
  privateBDAuth,
  updateProjectionStatus
);
router.put("/update-lead-activity", ceb, privateBDAuth, updateLeadActivity); //updateManagerValidate, clusterReqValid,
router.put(
  "/add-comment-lead-activity",
  ceb,
  privateBDAuth,
  addCommentLeadActivity
); //updateManagerValidate,clusterReqValid,
// router.get("/get-lead-activity", privateBDAuth, getLeadActivity);
router.get("/get-lead-activity", privateBDAuth, getAllLeadActivities);
router.get("/get-all-activities", privateBDAuth, getAllActivities);
router.get("/get-lead-counts", privateBDAuth, getAllLeadCounts);
router.post("/add-lead-followup-call", privateBDAuth, addLeadFollowupCall);
router.get("/get-lead-followup-call", privateBDAuth, getLeadFollowupCall);
router.post("/add-lead-response", privateBDAuth, addLeadResponse);
router.get("/get-lead-response", privateBDAuth, getLeadResponse);
// router.post("/update-followup-dates", updateFollowupDates); //privateBDAuth
// Add Call
router.post("/add-call", ceb, privateBDAuth, callValidate, bdReqValid, addCall);
router.get("/get-lead-call", privateBDAuth, getLeadCalls);
router.put("/update-call", ceb, privateBDAuth, updateCall); //updateManagerValidate, clusterReqValid,
router.get("/get-call-activities", privateBDAuth, getCallActivity);
router.put("/update-call-activity", ceb, privateBDAuth, updateCallActivity); //updateManagerValidate, clusterReqValid,
router.put(
  "/add-comment-call-activity",
  ceb,
  privateBDAuth,
  addCommentCallActivity
); //updateManagerValidate, clusterReqValid,
router.get("/get-call-counts", privateBDAuth, getAllCallCounts);
// router.get('/get-call-details', privateBDAuth, getCalls);

//Add RFP
router.post(
  "/add-rfp",
  uploadAttachment,
  ceb,
  privateBDAuth,
  rfpValidate,
  bdReqValid,
  addRFP
);
router.get("/get-rfp", privateBDAuth, getRfp);
// router.get("/get-rfp-mom", privateBDAuth, getRfpMom);
router.put("/update-rfp", uploadAttachment, ceb, privateBDAuth, updateRFP); //updateManagerValidate, clusterReqValid,
router.put(
  "/update-rfp-proposal-value",
  ceb,
  privateBDAuth,
  updateRFPProposalValue
); //updateManagerValidate, clusterReqValid,
router.put("/update-rfp-status", ceb, privateBDAuth, updateRfpStatus);
router.get("/get-rfp-activities", privateBDAuth, getRFPActivities);
router.put("/update-rfp-activity", ceb, privateBDAuth, updateRfpActivity); //updateManagerValidate, clusterReqValid,
router.put(
  "/add-comment-rfp-activity",
  ceb,
  privateBDAuth,
  addCommentRFPActivity
);

// Add Proposal
router.post(
  "/add-proposal",
  uploadFiles,
  ceb,
  privateBDAuth,
  proposalValidate,
  bdReqValid,
  addProposal
);
router.put(
  "/update-proposal",
  uploadFiles,
  ceb,
  privateBDAuth,
  proposalValidate,
  bdReqValid,
  updateProposal
);
router.get("/get-proposal", privateBDAuth, getProposal);
// router.get("/get-proposal-counts", privateBDAuth, getAllProposalCounts);

// DSR Report
router.get("/get-dsr-report", privateBDAuth, getDSRReport);
router.post("/update-dsr-report", privateBDAuth, updateDSRReport);
router.post("/get-dsr-report-detail", privateBDAuth, getDSRReportDetails);
router.post("/upload-leads-data", uploadLeads, uploadLead);

router.post("/manual-dsr", createManualDsr);

module.exports = router;
