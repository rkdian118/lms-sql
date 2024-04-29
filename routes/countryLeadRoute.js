const express = require("express");
const router = express.Router();
const { ceb } = require("../middleware/EmptyBody");
const { uploadPic } = require("../helper/profilePicHelper");
const { clGetBDs, clGetBDDetail, clGetBDsDropdown, } = require("../controller/ClusterLeadController/clBDController");
const { clGetLeads, clGetDropdownLeads, clUpdateLead, clUpdateLeadStatus, clUpdateLeadActivity, clGetLeadActivity, clAddCommentLeadActivity, clGetLeadResponse, clGetLeadFollowupCall, clGetAllLeadActivities, } = require("../controller/ClusterLeadController/clBDLeadsController");
const { getLeads } = require("../controller/CountryLeadController/bdLeadsController.js");
const { privateClusterLeadAuth, privateCountryLeadAuth } = require("../middleware/Auth");
const { clAddCall, clGetLeadCalls, clUpdateCall, clGetCallActivity, clUpdateCallActivity, clAddCommentCallActivity, } = require("../controller/ClusterLeadController/clBDCallController");
const { callValidate, bdReqValid, proposalValidate, rfpValidate, } = require("../middleware/Validators/bdValidator");
const { uploadAttachment } = require("../helper/attachmentHelper");
const { clGetRfp, clGetRfpMom, clUpdateRFP, clUpdateRfpStatus, clGetRFPActivities, clUpdateRfpActivity, clAddCommentRFPActivity, clAddRFP, clUpdateRFPProposalValue, } = require("../controller/ClusterLeadController/clBDRFPController");
const { uploadFiles } = require("../helper/proposalDocHelper");
const { clGetProposal, clUpdateProposal, } = require("../controller/ClusterLeadController/clBDProposalController");
const { clGetDashboard, clGetBDTargets, clGetDashFollowupLeads, clGetDashCallLeads, clGetDashRfpLeads, clGetLeadDetails, clGetCallDetails, clGetRfpDetail, clGetLeadTypeGraph, clUpdateFollowupDate, } = require("../controller/ClusterLeadController/clBDDashController");
const { clGetBDsTarget, clGetBDTargetDetail, clUpdateBDTarget, BDTargetDropdown, } = require("../controller/ClusterLeadController/clBDTargController");
const { getBDDSRReportDetails, getBDDSRReport, getCLDSRReport, } = require("../controller/ClusterLeadController/clBDDSRController");

// CL Dashboard Management.
router.get("/dashboard", privateClusterLeadAuth, clGetDashboard);
router.get("/dashboard-graph", privateClusterLeadAuth, clGetLeadTypeGraph);
router.get("/dashboard-followup-leads", privateClusterLeadAuth, clGetDashFollowupLeads);
router.put("/update-followup-date", privateClusterLeadAuth, clUpdateFollowupDate);
router.get("/dashboard-call-leads", privateClusterLeadAuth, clGetDashCallLeads);
router.get("/dashboard-rfp-leads", privateClusterLeadAuth, clGetDashRfpLeads);
router.get("/get-lead-details", privateClusterLeadAuth, clGetLeadDetails);
router.get("/get-call-details", privateClusterLeadAuth, clGetCallDetails);
router.get("/get-rfp-details", privateClusterLeadAuth, clGetRfpDetail);


// CL Lead Management.
router.get("/get-leads", privateCountryLeadAuth, getLeads);
router.get("/get-dropdown-leads", privateClusterLeadAuth, clGetDropdownLeads);
// router.get("/get-lead-activity",  privateClusterLeadAuth, clGetLeadActivity);
router.get("/get-lead-activity", privateClusterLeadAuth, clGetAllLeadActivities);
router.put("/update-lead-activity", ceb, privateClusterLeadAuth, clUpdateLeadActivity); //updateManagerValidate, clusterReqValid,
router.put("/add-comment-lead-activity", ceb, privateClusterLeadAuth, clAddCommentLeadActivity); //updateManagerValidate, clusterReqValid,
router.get("/get-lead-response", privateClusterLeadAuth, clGetLeadResponse);
router.get("/get-lead-followup-call", privateClusterLeadAuth, clGetLeadFollowupCall);

// CL Call Management
router.post('/add-call', ceb, privateClusterLeadAuth, callValidate, bdReqValid, clAddCall);
router.get("/get-lead-call", privateClusterLeadAuth, clGetLeadCalls);
router.put("/update-call", ceb, privateClusterLeadAuth, clUpdateCall); //updateManagerValidate, clusterReqValid,
router.get("/get-call-activities", privateClusterLeadAuth, clGetCallActivity);
router.put("/update-call-activity", ceb, privateClusterLeadAuth, clUpdateCallActivity); //updateManagerValidate, clusterReqValid,
router.put("/add-comment-call-activity", ceb, privateClusterLeadAuth, clAddCommentCallActivity); //updateManagerValidate, clusterReqValid,
// router.get('/get-call-details', privateClusterLeadAuth, getCalls);

//CL RFP Management
router.post('/add-rfp', uploadAttachment, ceb, privateClusterLeadAuth, rfpValidate, bdReqValid, clAddRFP);
router.get("/get-rfp", privateClusterLeadAuth, clGetRfp);
router.put("/update-rfp", uploadAttachment, ceb, privateClusterLeadAuth, clUpdateRFP); //updateManagerValidate, clusterReqValid,
router.put("/update-rfp-proposal-value", ceb, privateClusterLeadAuth, clUpdateRFPProposalValue); //updateManagerValidate, clusterReqValid,
router.get("/get-rfp-mom", privateClusterLeadAuth, clGetRfpMom);
router.put("/update-rfp-status", ceb, privateClusterLeadAuth, clUpdateRfpStatus);
router.get("/get-rfp-activities", privateClusterLeadAuth, clGetRFPActivities);
router.put("/update-rfp-activity", ceb, privateClusterLeadAuth, clUpdateRfpActivity); //updateManagerValidate, clusterReqValid,
router.put("/add-comment-rfp-activity", ceb, privateClusterLeadAuth, clAddCommentRFPActivity); //updateManagerValidate, clusterReqValid,

// CL Proposal Proposal
// router.post('/add-proposal', uploadFiles, ceb, privateBDAuth, proposalValidate, bdReqValid, addProposal);
router.get("/get-proposal", privateClusterLeadAuth, clGetProposal);
router.put("/update-proposal", uploadFiles, ceb, privateClusterLeadAuth, proposalValidate, bdReqValid, clUpdateProposal);

//BD Targets routes.
router.post("/get-bds-targets", privateClusterLeadAuth, clGetBDsTarget);
router.post("/get-bds-target-dropdown", privateClusterLeadAuth, BDTargetDropdown);
router.get("/get-bd-target-detail", privateClusterLeadAuth, clGetBDTargetDetail);
router.put("/update-bd-target", privateClusterLeadAuth, clUpdateBDTarget);
router.get("/bd-dsr-get", privateClusterLeadAuth, getBDDSRReport);
router.post("/bd-dsr-get-detail", privateClusterLeadAuth, getBDDSRReportDetails);
router.get("/get-dsr", privateClusterLeadAuth, getCLDSRReport);


module.exports = router;
