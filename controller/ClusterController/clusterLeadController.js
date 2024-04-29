const ErrorHandler = require("../../Utils/errorHandler");
const { SuccessHandler } = require("../../middleware/resHandler");
const { createclusterLeadService, createclusterLeadCredentialService, getclusterLeadsService, getclusterLeadDetailService, updateclusterLeadService, clusterLeadStatusChangeService, getDropdownclusterLeadsService, getDropdownBDEsService } = require("../../service/ClusterService/clusterLeadService");

class ClusterLeadController {

  // async createclusterLead (req, res, next) {
  //   return await Promise.resolve(createclusterLeadService(req)).then(async (clusterLead) => {
  //     if (clusterLead && clusterLead.success) {
  //       return await Promise.resolve(createclusterLeadCredentialService(req, clusterLead.data)).then((logins) => {
  //         if (logins && logins.success) {
  //           SuccessHandler(req, res, "Team Lead created successfully.", logins.status, logins.data)
  //           // res.json({ "ResponseCode": logins.status, "ResponseMessage": "clusterLead head created successfully.", "succeeded": logins.success, "ResponseData": logins.data });
  //         } else {
  //           return next(new ErrorHandler(logins.msg, logins.status, logins.data));
  //         }
  //       }).catch((error) => {
  //         return next(new ErrorHandler("Something want wrong when create team lead credential.", 500, error));
  //       })
  //     } else {
  //       return next(new ErrorHandler(clusterLead.msg, clusterLead.status, clusterLead.data));
  //     }
  //   }).catch((error) => {
  //     return next(new ErrorHandler("Something want wrong when create Team Lead.", 500, error));
  //   })
  // }

  async createclusterLead(req, res, next) {
    try {
      const clusterLead = await createclusterLeadService(req);
      const { success, msg, status, data } = clusterLead;
      if (success) {
        const clusterLeadCred = await createclusterLeadCredentialService(req, data);
        // const { success , msg, status, data } = clusterLeadCred;
        if (clusterLeadCred.success) {
          SuccessHandler(req, res, "Cluster Lead created successfully.", clusterLeadCred.status, clusterLeadCred.data);
        } else {
          next(new ErrorHandler(clusterLeadCred.msg, clusterLeadCred.status, clusterLeadCred.data));
        }
      } else {
        next(new ErrorHandler(msg, status, data));
      }
    } catch (error) {
      next(
        new ErrorHandler(
          error, //"Something went wrong when getting Lead Type.",
          500,
          error
        )
      );
    }
  }

  async getclusterLeads(req, res, next) {
    try {
      const result = await getclusterLeadsService(req);
      const { success, msg, status, data } = result;
      if (success) {
        SuccessHandler(req, res, msg, status, data);
      } else {
        next(new ErrorHandler(msg, status, data));
      }
    } catch (error) {
      next(
        new ErrorHandler(
          error, //"Something went wrong when getting cluster leads.",
          500,
          error
        )
      );
    }
  }

  async getclusterLeadDetail(req, res, next) {
    try {
      const { cluster_lead_id } = req.query;
      const result = await getclusterLeadDetailService(req, cluster_lead_id);
      const { success, msg, status, data } = result;
      if (success) {
        SuccessHandler(req, res, msg, status, data);
      } else {
        next(new ErrorHandler(msg, status, data));
      }
    } catch (error) {
      next(
        new ErrorHandler(
          error, //"Something went wrong when getting Team Lead detail.",
          500,
          error
        )
      );
    }
  }

  async updateclusterLead(req, res, next) {
    try {
      const cluster = await updateclusterLeadService(req);
      const { success, msg, status, data } = cluster;
      if (success) {
        SuccessHandler(req, res, msg, status, data);
      } else {
        next(new ErrorHandler(msg, status, data));
      }
    } catch (error) {
      next(new ErrorHandler(error, 500, error));//"Something want wrong when update cluster head."
    }
  }

  async clusterLeadStatusChange(req, res, next) {
    try {
      const clusterLead = await clusterLeadStatusChangeService(req);
      const { success, msg, status, data } = clusterLead;
      if (success) {
        SuccessHandler(req, res, msg, status, data);
      } else {
        next(new ErrorHandler(msg, status, data));
      }
    } catch (error) {
      next(
        new ErrorHandler(
          error, //"Something want wrong when Team Lead status change.",
          500,
          error
        )
      );
    }
  }

  async getDropdownclusterLeads(req, res, next) {
    try {
      const result = await getDropdownclusterLeadsService(req);
      const { success, msg, status, data } = result;
      if (success) {
        SuccessHandler(req, res, msg, status, data);
      } else {
        next(new ErrorHandler(msg, status, data));
      }
    } catch (error) {
      next(
        new ErrorHandler(
          error, //"Something went wrong when getting cluster lead dropdown.",
          500,
          error
        )
      );
    }
  }

  async getDropdownBDEs(req, res, next) {
    try {
      const result = await getDropdownBDEsService(req);
      const { success, msg, status, data } = result;
      if (success) {
        SuccessHandler(req, res, msg, status, data);
      } else {
        next(new ErrorHandler(msg, status, data));
      }
    } catch (error) {
      next(
        new ErrorHandler(
          error, //"Something went wrong when getting cluster lead dropdown.",
          500,
          error
        )
      );
    }
  }

}
module.exports = new ClusterLeadController()