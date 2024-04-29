const proposalModel = require("../../model/BDModel/proposalModel ");
const leadActivityModel = require("../../model/BDModel/leadActivityModel");
const { default: mongoose } = require("mongoose");
const leadModel = require("../../model/BDModel/leadModel");
class BhBdProposalService {
  // async bhAddProposalService(req) {
  //     try {
  //         const { body, files, user } = req;

  //         let proposal = [];
  //         let wbs = [];
  //         let wireframe = [];
  //         let other_doc = [];
  //         if (files) {
  //             if (files?.proposal) {
  //                 files.proposal.forEach((file) => proposal.push(file.path));
  //             }
  //             if (files?.wbs) {
  //                 files.wbs.forEach((file) => wbs.push(file.path));
  //             }
  //             if (files?.wireframe) {
  //                 files.wireframe.forEach((file) => wireframe.push(file.path));
  //             }
  //             if (files?.other_doc) {
  //                 files.other_doc.forEach((file) => other_doc.push(file.path));
  //             }
  //         }

  //         const proposalData = {
  //             bd_id: user._id,
  //             lead_id: body.lead_id,
  //             proposal: [{
  //                 proposal_type_id: body.proposal_type_id,
  //                 proposal: proposal,
  //                 wbs: wbs,
  //                 wireframe: wireframe,
  //                 other_doc: other_doc,
  //                 comment_remark: body.comment_remark
  //             }],
  //             amount: body.amount,
  //             timeline: body.timeline,
  //         };

  //         const filterProposal = {
  //             ...Object.fromEntries(Object.entries(proposalData).filter(([_, v]) => v)),
  //         };

  //         const checkProposal = await proposalModel
  //             .findOne({
  //                 $and: [
  //                     { bd_id: user._id },
  //                     { lead_id: body.lead_id },
  //                 ],
  //             });

  //         if (checkProposal) {
  //             return { success: false, msg: "You have already created proposal.", status: 400, data: checkProposal };
  //         }

  //         const formData = proposalModel(filterProposal);
  //         const data = await formData.save();

  //         if (data) {
  //             const activity = await leadActivityModel({
  //                 lead_id: data.lead_id,
  //                 activity_id: body.proposal_type_id,
  //                 comment: [{
  //                     comment_by_id: req.user._id,
  //                     comment: body?.comment_remark
  //                 }]
  //             })

  //             const leadactivityData = await activity.save();
  //         }
  //         return { status: 201, success: true, msg: "Proposal created successfully.", data: data };
  //     } catch (error) {
  //         return { status: 500, success: false, msg: "Something went wrong when add proposal", data: error };
  //     }
  // }

  async bhUpdateProposalService(req) {
    try {
      const { body, files, user } = req;

      let proposal = [];
      let wbs = [];
      let wireframe = [];
      let other_doc = [];
      if (files) {
        if (files?.proposal) {
          files.proposal.forEach((file) => proposal.push(file.path));
        }
        if (files?.wbs) {
          files.wbs.forEach((file) => wbs.push(file.path));
        }
        if (files?.wireframe) {
          files.wireframe.forEach((file) => wireframe.push(file.path));
        }
        if (files?.other_doc) {
          files.other_doc.forEach((file) => other_doc.push(file.path));
        }
      }

      const proposalData = {
        proposal_type_id: body.proposal_type_id,
        proposal: proposal,
        wbs: wbs,
        wireframe: wireframe,
        other_doc: other_doc,
        comment_remark: body.comment_remark,
      };

      const filterProposal = {
        ...Object.fromEntries(
          Object.entries(proposalData).filter(([_, v]) => v)
        ),
      };

      const checkProposal = await proposalModel.findOne({
        $and: [
          // { bd_id: user._id },
          { lead_id: body.lead_id },
        ],
      });

      if (!checkProposal) {
        return {
          success: false,
          msg: "proposal not found.",
          status: 400,
          data: checkProposal,
        };
      }

      let checklead = await leadModel.findOne({
        $and: [
          { _id: new mongoose.Types.ObjectId(body.lead_id) },
          // { _id: body.lead_id },
          // { bd_id: user._id },
        ],
      });

      if (!checklead) {
        return {
          success: false,
          msg: "lead not found.",
          status: 400,
          data: checklead,
        };
      }

      const activity = await checkProposal.proposal.unshift(proposalData);

      body.project_name != "" && checkProposal.project_name != body.project_name
        ? (checkProposal.project_name = body.project_name)
        : (checkProposal.project_name = checkProposal.project_name);
      body.upfront_amount != "" &&
      checkProposal.upfront_amount != body.upfront_amount
        ? (checkProposal.upfront_amount = body.upfront_amount)
        : (checkProposal.upfront_amount = checkProposal.upfront_amount);
      body.project_amount != "" &&
      checkProposal.project_amount != body.project_amount
        ? (checkProposal.project_amount = body.project_amount)
        : (checkProposal.project_amount = checkProposal.project_amount);
      body.proposal_submitted != "" &&
      checkProposal.proposal_submitted != body.proposal_submitted
        ? (checkProposal.proposal_submitted = body.proposal_submitted)
        : (checkProposal.proposal_submitted = checkProposal.proposal_submitted);
      body.timeline_days != "" &&
      checkProposal.timeline_days != body.timeline_days
        ? (checkProposal.timeline_days = body.timeline_days)
        : (checkProposal.timeline_days = checkProposal.timeline_days);
      body.man_hour != "" && checkProposal.man_hour != body.man_hour
        ? (checkProposal.man_hour = body.man_hour)
        : (checkProposal.man_hour = checkProposal.man_hour);

      const data = await checkProposal.save();
      if (data) {
        body.project_amount != "" &&
        checklead.project_amount != body.project_amount
          ? (checklead.project_amount = body.project_amount)
          : (checklead.project_amount = checklead.project_amount);
        const leaddata = await checklead.save();

        const activity = await leadActivityModel({
          lead_id: data.lead_id,
          activity_id: body.proposal_type_id,
          comment: [
            {
              comment_by_id: req.user._id,
              comment: body?.comment_remark,
            },
          ],
        });

        const leadactivityData = await activity.save();
      }

      return {
        status: 201,
        success: true,
        msg: "Proposal update successfully.",
        data: data,
      };
    } catch (error) {
      return {
        status: 500,
        success: false,
        msg: "Something went wrong when add proposal",
        data: error,
      };
    }
  }

  async bhGetProposalService(req) {
    try {
      const {
        page,
        limit,
        search,
        lead_id,
        bd_id,
        cluster_lead_id,
        is_dashboard,
      } = req.query;
      const options = {
        page: page ? page : 1, // Page number
        limit: limit ? limit : 10, // Number of documents per page
      };

      let matchQuery = {};
      let userFilter = [];
      // req.user._id ? userFilter.push({ bd_id: req.user._id }) : "";
      // req.query.lead_id ? userFilter.push({ lead_id: new mongoose.Types.ObjectId(req.query.lead_id) }) : "";

      req?.user?._id
        ? userFilter.push({ "bdData.cluster_head_id": req.user._id })
        : "";
      lead_id
        ? userFilter.push({ lead_id: new mongoose.Types.ObjectId(lead_id) })
        : "";
      bd_id
        ? userFilter.push({ "bdData._id": new mongoose.Types.ObjectId(bd_id) })
        : "";
      cluster_lead_id
        ? userFilter.push({
            "bdData.cluster_lead_id": new mongoose.Types.ObjectId(
              cluster_lead_id
            ),
          })
        : "";

      if (is_dashboard) {
        userFilter.push({
          project_amount: { $gt: 0 },
        });
      }
      if (search) {
        matchQuery["$or"] = [
          { "bdData.name": { $regex: search, $options: "i" } }, // Case-insensitive search for client_name
          { "bdData.email": { $regex: search, $options: "i" } }, // Case-insensitive search for client_name
          { "leadData.client_name": { $regex: search, $options: "i" } }, // Case-insensitive search for client_email
          { "leadData.client_email": { $regex: search, $options: "i" } }, // Case-insensitive search for client_email
        ];
      }
      const resultAggregate = proposalModel.aggregate([
        {
          $lookup: {
            from: "businesses",
            localField: "bd_id",
            foreignField: "_id",
            as: "bdData",
          },
        },
        {
          $unwind: {
            path: "$bdData",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $match: { $and: userFilter },
        },
        {
          $lookup: {
            from: "cluster_leads",
            localField: "bdData.cluster_lead_id",
            foreignField: "_id",
            as: "clusterLeadData",
          },
        },
        {
          $unwind: {
            path: "$clusterLeadData",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: "leads",
            localField: "lead_id",
            foreignField: "_id",
            as: "leadData",
            pipeline: [
              {
                $lookup: {
                  from: "master_statuses",
                  localField: "lead_req_type_id",
                  foreignField: "_id",
                  as: "reqTypeData",
                },
              },
              {
                $unwind: {
                  path: "$reqTypeData",
                  preserveNullAndEmptyArrays: true,
                },
              },
              {
                $project: {
                  _id: 1,
                  lead_source_id: 1,
                  client_name: 1,
                  client_number: 1,
                  client_whatsapp_num: 1,
                  client_email: 1,
                  client_country: 1,
                  address: 1,
                  client_linkedin: 1,
                  upwork_job_url: 1,
                  bid_url: 1,
                  skype_id: 1,
                  company_name: 1,
                  client_alternate_email: 1,
                  proposal_amount: 1,
                  client_budget: 1,
                  follow_up: 1,
                  add_notes: 1,
                  lead_status: 1,
                  status: 1,
                  deleted: 1,
                  createdAt: 1,
                  updatedAt: 1,
                  bd_id: 1,
                  lead_type_id: 1,
                  reqTypeData: {
                    _id: "$reqTypeData._id",
                    status_name: "$reqTypeData.status_name",
                  },
                },
              },
            ],
          },
        },
        {
          $unwind: {
            path: "$leadData",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $match: matchQuery,
        },
        {
          $unwind: "$proposal",
        },
        {
          $lookup: {
            from: "master_statuses",
            localField: "proposal.proposal_type_id",
            foreignField: "_id",
            as: "proposal.proposal_type_data",
          },
        },
        {
          $unwind: "$proposal.proposal_type_data",
        },
        {
          $group: {
            _id: "$_id",
            proposal: {
              $push: "$proposal",
            },
            bdData: {
              $first: "$bdData",
            },
            leadData: {
              $first: "$leadData",
            },
            clusterLeadData: {
              $first: "$clusterLeadData",
            },
            project_name: {
              $first: "$project_name",
            },
            upfront_amount: {
              $first: "$upfront_amount",
            },
            project_amount: {
              $first: "$project_amount",
            },
            proposal_submitted: {
              $first: "$proposal_submitted",
            },
            timeline_days: {
              $first: "$timeline_days",
            },
            man_hour: {
              $first: "$man_hour",
            },
            deleted: {
              $first: "$deleted",
            },
            status: {
              $first: "$status",
            },
            createdAt: {
              $first: "$createdAt",
            },
            updatedAt: {
              $first: "$updatedAt",
            },
          },
        },
        {
          $sort: { createdAt: -1 },
        },
      ]);

      const proposals = await proposalModel.aggregatePaginate(
        resultAggregate,
        options
      );

      if (!proposals || proposals == "") {
        return {
          status: 201,
          success: true,
          msg: "Proposals not found.",
          data: [],
        };
      }
      return {
        status: 200,
        success: true,
        msg: "Proposals get successfully.",
        data: proposals,
      };
    } catch (error) {
      return {
        status: 400,
        success: false,
        msg: error, //"Somethin went wrong when get proposal service.",
        data: error,
      };
    }
  }
}

module.exports = new BhBdProposalService();
