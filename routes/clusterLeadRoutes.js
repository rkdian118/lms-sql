const express = require("express");
const router = express.Router();
const { ceb } = require("../middleware/EmptyBody");
const { uploadPic } = require("../helper/profilePicHelper");
const { ClusterLeadValidate, clusterReqValid, } = require("../middleware/Validators/clusterValidator");
const { clGetBDs, clGetBDDetail, clGetBDsDropdown, } = require("../controller/ClusterLeadController/clBDController");
const { clGetLeads, clGetDropdownLeads, clUpdateLead, clUpdateLeadStatus, clUpdateLeadActivity, clGetLeadActivity, clAddCommentLeadActivity, clGetLeadResponse, clGetLeadFollowupCall, clGetAllLeadActivities, } = require("../controller/ClusterLeadController/clBDLeadsController");
const { privateClusterLeadAuth } = require("../middleware/Auth");
const { clAddCall, clGetLeadCalls, clUpdateCall, clGetCallActivity, clUpdateCallActivity, clAddCommentCallActivity, } = require("../controller/ClusterLeadController/clBDCallController");
const { callValidate, bdReqValid, proposalValidate, rfpValidate, } = require("../middleware/Validators/bdValidator");
const { uploadAttachment } = require("../helper/attachmentHelper");
const { clGetRfp, clGetRfpMom, clUpdateRFP, clUpdateRfpStatus, clGetRFPActivities, clUpdateRfpActivity, clAddCommentRFPActivity, clAddRFP, clUpdateRFPProposalValue, } = require("../controller/ClusterLeadController/clBDRFPController");
const { uploadFiles } = require("../helper/proposalDocHelper");
const { clGetProposal, clUpdateProposal, } = require("../controller/ClusterLeadController/clBDProposalController");
const { clGetDashboard, clGetBDTargets, clGetDashFollowupLeads, clGetDashCallLeads, clGetDashRfpLeads, clGetLeadDetails, clGetCallDetails, clGetRfpDetail, clGetLeadTypeGraph, clUpdateFollowupDate, } = require("../controller/ClusterLeadController/clBDDashController");
const { clGetBDsTarget, clGetBDTargetDetail, clUpdateBDTarget, BDTargetDropdown, } = require("../controller/ClusterLeadController/clBDTargController");
const { getBDDSRReportDetails, getBDDSRReport, getCLDSRReport, } = require("../controller/ClusterLeadController/clBDDSRController");
// router.post('/create-cluster-lead', uploadPic, ceb, privateClusterLeadAuth, ClusterLeadValidate, clusterReqValid, createClusterLead);

// CL Dashboard Management.
router.get("/cl-dashboard", privateClusterLeadAuth, clGetDashboard);
router.get("/cl-dashboard-graph", privateClusterLeadAuth, clGetLeadTypeGraph);
// router.get('/cl-dashboard-bd-targets', privateClusterLeadAuth, clGetBDTargets);
router.get("/cl-dashboard-followup-leads", privateClusterLeadAuth, clGetDashFollowupLeads);
router.put("/cl-update-followup-date", privateClusterLeadAuth, clUpdateFollowupDate);
router.get("/cl-dashboard-call-leads", privateClusterLeadAuth, clGetDashCallLeads);
router.get("/cl-dashboard-rfp-leads", privateClusterLeadAuth, clGetDashRfpLeads);
router.get("/cl-get-lead-details", privateClusterLeadAuth, clGetLeadDetails);
router.get("/cl-get-call-details", privateClusterLeadAuth, clGetCallDetails);
router.get("/cl-get-rfp-details", privateClusterLeadAuth, clGetRfpDetail);

// BD Routes.
router.get("/cl-get-bds-list", privateClusterLeadAuth, clGetBDs);
router.get("/cl-get-bds-dropdown-list", privateClusterLeadAuth, clGetBDsDropdown);
router.get("/cl-get-bd-detail", privateClusterLeadAuth, clGetBDDetail);

// CL Lead Management.
router.get("/cl-get-leads", privateClusterLeadAuth, clGetLeads);
router.put("/cl-update-lead", ceb, privateClusterLeadAuth, clUpdateLead); //updateManagerValidate, clusterReqValid,
router.put("/cl-update-lead-status", ceb, privateClusterLeadAuth, clUpdateLeadStatus);
router.get("/cl-get-dropdown-leads", privateClusterLeadAuth, clGetDropdownLeads);
router.get("/cl-get-lead-activity", privateClusterLeadAuth, clGetLeadActivity);
router.get("/cl-get-lead-activity", privateClusterLeadAuth, clGetAllLeadActivities);
router.put("/cl-update-lead-activity", ceb, privateClusterLeadAuth, clUpdateLeadActivity); //updateManagerValidate, clusterReqValid,
router.put("/cl-add-comment-lead-activity", ceb, privateClusterLeadAuth, clAddCommentLeadActivity); //updateManagerValidate, clusterReqValid,
router.get("/cl-get-lead-response", privateClusterLeadAuth, clGetLeadResponse);
router.get("/cl-get-lead-followup-call", privateClusterLeadAuth, clGetLeadFollowupCall);

// CL Call Management
router.post('/cl-add-call', ceb, privateClusterLeadAuth, callValidate, bdReqValid, clAddCall);
router.get("/cl-get-lead-call", privateClusterLeadAuth, clGetLeadCalls);
router.put("/cl-update-call", ceb, privateClusterLeadAuth, clUpdateCall); //updateManagerValidate, clusterReqValid,
router.get("/cl-get-call-activities", privateClusterLeadAuth, clGetCallActivity);
router.put("/cl-update-call-activity", ceb, privateClusterLeadAuth, clUpdateCallActivity); //updateManagerValidate, clusterReqValid,
router.put("/cl-add-comment-call-activity", ceb, privateClusterLeadAuth, clAddCommentCallActivity); //updateManagerValidate, clusterReqValid,
// router.get('/get-call-details', privateClusterLeadAuth, getCalls);

//CL RFP Management
router.post('/cl-add-rfp', uploadAttachment, ceb, privateClusterLeadAuth, rfpValidate, bdReqValid, clAddRFP);
router.get("/cl-get-rfp", privateClusterLeadAuth, clGetRfp);
router.put("/cl-update-rfp", uploadAttachment, ceb, privateClusterLeadAuth, clUpdateRFP); //updateManagerValidate, clusterReqValid,
router.put("/cl-update-rfp-proposal-value", ceb, privateClusterLeadAuth, clUpdateRFPProposalValue); //updateManagerValidate, clusterReqValid,
router.get("/cl-get-rfp-mom", privateClusterLeadAuth, clGetRfpMom);
router.put("/cl-update-rfp-status", ceb, privateClusterLeadAuth, clUpdateRfpStatus);
router.get("/cl-get-rfp-activities", privateClusterLeadAuth, clGetRFPActivities);
router.put("/cl-update-rfp-activity", ceb, privateClusterLeadAuth, clUpdateRfpActivity); //updateManagerValidate, clusterReqValid,
router.put("/cl-add-comment-rfp-activity", ceb, privateClusterLeadAuth, clAddCommentRFPActivity); //updateManagerValidate, clusterReqValid,

// CL Proposal Proposal
// router.post('/add-proposal', uploadFiles, ceb, privateBDAuth, proposalValidate, bdReqValid, addProposal);
router.get("/cl-get-proposal", privateClusterLeadAuth, clGetProposal);
router.put("/cl-update-proposal", uploadFiles, ceb, privateClusterLeadAuth, proposalValidate, bdReqValid, clUpdateProposal);

//BD Targets routes.
// router.get("/cl-get-targets", privateClusterLeadAuth, clGetTarget);
router.post("/cl-get-bds-targets", privateClusterLeadAuth, clGetBDsTarget);
router.post("/get-bds-target-dropdown", privateClusterLeadAuth, BDTargetDropdown);
router.get("/cl-get-bd-target-detail", privateClusterLeadAuth, clGetBDTargetDetail);
router.put("/cl-update-bd-target", privateClusterLeadAuth, clUpdateBDTarget);
router.get("/cl-bd-dsr-get", privateClusterLeadAuth, getBDDSRReport);
router.post("/cl-bd-dsr-get-detail", privateClusterLeadAuth, getBDDSRReportDetails);
router.get("/get-cl-dsr", privateClusterLeadAuth, getCLDSRReport);

// router.post("/cron-assign-bd-targets", generateBDTarget);
// router.post("/assign-bd-targets", privateClusterLeadAuth, assignBDTarget);
// router.get('/get-bds-targets', privateClusterLeadAuth, getBDsTarget);
// router.get('/get-bd-target-detail', privateClusterLeadAuth, getBDTargetDetail);
// router.put('/update-bd-target', privateClusterLeadAuth, updateBDTarget);
// router.put('/complete-bd-target', privateClusterLeadAuth, manCompBDTarget);

module.exports = router;
