const jwt = require("jsonwebtoken");
// const userService = require("../Services/userService");
const admin = require("../controller/AdminController/adminController");
const userService = require("../service/userService");
const ErrorHandler = require("../Utils/errorHandler");
const { SuccessHandler } = require("./resHandler");

class Auth {
  tempAdminAuth(req, res, next) {
    var token = req.headers.authorization;
    if (!token) {
      return next(new ErrorHandler("Token Required", 401, { token }));
    }
    token = token.split(" ")[1];
    var privatekey = process.env.TEMP_KEY;
    jwt.verify(token, privatekey, async (err, decoded) => {
      if (err) {
        if (err.name == "TokenExpiredError") {
          return next(new ErrorHandler("Session Time Out", 403, { token }));
        }
        return next(new ErrorHandler("Invalid token", 401, { token }));
      } else {
        req.decoded = decoded;

        const userDetails = await userService.userProfileService(
          decoded._id,
          decoded.role_type
        );
        if (!userDetails.success) {
          return next(
            new ErrorHandler(
              userDetails.msg,
              userDetails.status,
              userDetails.data
            )
          );
        }
        req.user = userDetails.data;
        next();
      }
    });
  }

  privateUserAuth(req, res, next) {
    var token = req.headers.authorization;
    if (!token) {
      return next(new ErrorHandler("Token Required", 401, { token }));
    }
    token = token.split(" ")[1];
    let privateKey = "";
    if (req?.body?.role_type) {
      privateKey =
        req?.body?.role_type == "Cluster"
          ? process.env.CLUSTER_KEY
          : req?.body?.role_type == "Manager"
            ? process.env.MANAGER_KEY
            : req?.body?.role_type == "ClusterLead"
              ? process.env.CLUSTER_LEAD_KEY
              : req?.body?.role_type == "CountryLead"
                ? process.env.COUNTRY_LEAD_KEY
                : req?.body?.role_type == "Business"
                  ? process.env.BUSINESS_KEY
                  : process.env.ADMIN_KEY;
    } else {
      privateKey = process.env.ADMIN_KEY;
    }
    jwt.verify(token, privateKey, async (err, decoded) => {
      if (err) {
        if (err.name == "TokenExpiredError") {
          return next(new ErrorHandler("Session Time Out", 403, { token }));
        }
        return next(new ErrorHandler("Invalid token", 401, { token }));
      } else {
        req.decoded = decoded;
        const userDetails = await userService.userProfileService(
          decoded._id,
          decoded.role_type
        );
        if (!userDetails.success) {
          return next(
            new ErrorHandler(
              userDetails.msg,
              userDetails.status,
              userDetails.data
            )
          );
        }
        req.user = userDetails.data;
        next();
      }
    });
  }

  privateAdminAuth(req, res, next) {
    var token = req.headers.authorization;
    if (!token) {
      return next(new ErrorHandler("Token Required", 401, { token }));
    }
    token = token.split(" ")[1];
    let privateKey = process.env.ADMIN_KEY;

    jwt.verify(token, privateKey, async (err, decoded) => {
      if (err) {
        if (err.name == "TokenExpiredError") {
          return next(new ErrorHandler("Session Timeout", 403, { token }));
        }
        return next(new ErrorHandler("Invalid token", 401, { token }));
      } else {
        req.decoded = decoded;
        const userDetails = await userService.userProfileService(
          decoded._id,
          decoded.role_type
        );
        if (!userDetails.success && userDetails.status == 207) {
          return SuccessHandler(
            req,
            res,
            userDetails.msg,
            userDetails.status,
            userDetails.data
          );
          // return next(new ErrorHandler(userDetails.msg, userDetails.status, userDetails.data));
        }
        if (!userDetails.success) {
          return next(
            new ErrorHandler(
              userDetails.msg,
              userDetails.status,
              userDetails.data
            )
          );
        }
        req.user = userDetails.data;
        next();
      }
    });
  }

  privateClusterAuth(req, res, next) {
    var token = req.headers.authorization;
    if (!token) {
      return next(new ErrorHandler("Token Required", 401, { token }));
    }
    token = token.split(" ")[1];
    let privateKey = process.env.CLUSTER_KEY;

    jwt.verify(token, privateKey, async (err, decoded) => {
      if (err) {
        if (err.name == "TokenExpiredError") {
          return next(new ErrorHandler("Session Time Out", 403, { token }));
        }
        return next(new ErrorHandler("Invalid token", 401, { token }));
      } else {
        req.decoded = decoded;
        const userDetails = await userService.userProfileService(
          decoded._id,
          decoded.role_type
        );
        if (!userDetails.success && userDetails.status == 207) {
          return SuccessHandler(
            req,
            res,
            userDetails.msg,
            userDetails.status,
            userDetails.data
          );
          // return next(new ErrorHandler(userDetails.msg, userDetails.status, userDetails.data));
        }

        if (!userDetails.success) {
          return next(
            new ErrorHandler(
              userDetails.msg,
              userDetails.status,
              userDetails.data
            )
          );
        }
        req.user = userDetails.data;
        next();
      }
    });
  }

  privateManagerAuth(req, res, next) {
    var token = req.headers.authorization;
    if (!token) {
      return next(new ErrorHandler("Token Required", 401, { token }));
    }
    token = token.split(" ")[1];
    let privateKey = process.env.MANAGER_KEY;

    jwt.verify(token, privateKey, async (err, decoded) => {
      if (err) {
        if (err.name == "TokenExpiredError") {
          return next(new ErrorHandler("Session Time Out", 403, { token }));
        }
        return next(new ErrorHandler("Invalid token", 401, { token }));
      } else {
        req.decoded = decoded;
        const userDetails = await userService.userProfileService(
          decoded._id,
          decoded.role_type
        );
        if (!userDetails.success && userDetails.status == 207) {
          return SuccessHandler(
            req,
            res,
            userDetails.msg,
            userDetails.status,
            userDetails.data
          );
          // return next(new ErrorHandler(userDetails.msg, userDetails.status, userDetails.data));
        }
        if (!userDetails.success) {
          return next(
            new ErrorHandler(
              userDetails.msg,
              userDetails.status,
              userDetails.data
            )
          );
        }
        req.user = userDetails.data;
        next();
      }
    });
  }

  privateClusterLeadAuth(req, res, next) {
    var token = req.headers.authorization;
    if (!token) {
      return next(new ErrorHandler("Token Required", 401, { token }));
    }
    token = token.split(" ")[1];
    let privateKey = process.env.CLUSTER_LEAD_KEY;

    jwt.verify(token, privateKey, async (err, decoded) => {
      if (err) {
        if (err.name == "TokenExpiredError") {
          return next(new ErrorHandler("Session Time Out", 403, { token }));
        }
        return next(new ErrorHandler("Invalid token", 401, { token }));
      } else {
        req.decoded = decoded;
        const userDetails = await userService.userProfileService(
          decoded._id,
          decoded.role_type
        );
        if (!userDetails.success && userDetails.status == 207) {
          return SuccessHandler(
            req,
            res,
            userDetails.msg,
            userDetails.status,
            userDetails.data
          );
          // return next(new ErrorHandler(userDetails.msg, userDetails.status, userDetails.data));
        }
        if (!userDetails.success) {
          return next(
            new ErrorHandler(
              userDetails.msg,
              userDetails.status,
              userDetails.data
            )
          );
        }
        req.user = userDetails.data;
        next();
      }
    });
  }

  privateCountryLeadAuth(req, res, next) {
    var token = req.headers.authorization;
    if (!token) {
      return next(new ErrorHandler("Token Required", 401, { token }));
    }
    token = token.split(" ")[1];
    let privateKey = process.env.COUNTRY_LEAD_KEY;

    jwt.verify(token, privateKey, async (err, decoded) => {
      if (err) {
        if (err.name == "TokenExpiredError") {
          return next(new ErrorHandler("Session Time Out", 403, { token }));
        }
        return next(new ErrorHandler("Invalid token", 401, { token }));
      } else {
        req.decoded = decoded;
        const userDetails = await userService.userProfileService(
          decoded._id,
          decoded.role_type
        );
        if (!userDetails.success && userDetails.status == 207) {
          return SuccessHandler(
            req,
            res,
            userDetails.msg,
            userDetails.status,
            userDetails.data
          );
          // return next(new ErrorHandler(userDetails.msg, userDetails.status, userDetails.data));
        }
        if (!userDetails.success) {
          return next(
            new ErrorHandler(
              userDetails.msg,
              userDetails.status,
              userDetails.data
            )
          );
        }
        req.user = userDetails.data;
        next();
      }
    });
  }

  privateBDAuth(req, res, next) {
    var token = req.headers.authorization;
    if (!token) {
      return next(new ErrorHandler("Token Required", 401, { token }));
    }
    token = token.split(" ")[1];
    let privateKey = process.env.BUSINESS_KEY;

    jwt.verify(token, privateKey, async (err, decoded) => {
      if (err) {
        if (err.name == "TokenExpiredError") {
          return next(new ErrorHandler("Session Time Out", 403, { token }));
        }
        return next(new ErrorHandler("Invalid token", 401, { token }));
      } else {
        req.decoded = decoded;
        const userDetails = await userService.userProfileService(
          decoded._id,
          decoded.role_type
        );
        if (!userDetails.success && userDetails.status == 207) {
          return SuccessHandler(
            req,
            res,
            userDetails.msg,
            userDetails.status,
            userDetails.data
          );
          // return next(new ErrorHandler(userDetails.msg, userDetails.status, userDetails.data));
        }
        if (!userDetails.success) {
          return next(
            new ErrorHandler(
              userDetails.msg,
              userDetails.status,
              userDetails.data
            )
          );
        }
        req.user = userDetails.data;
        next();
      }
    });
  }
}

module.exports = new Auth();
