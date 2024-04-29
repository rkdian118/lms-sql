const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const loginsModel = require("../model/loginsModel");
const crypto = require("crypto");

const helperFunctions = {
  decodeAndVerifyToken: async (reqObj, tempKey) => {
    let token = reqObj.headers.authorization.split(" ")[1];
    const key = tempKey ? tempKey : process.env.PRIVATE_KEY;

    return Promise.resolve(jwt.verify(token, key));
  },

  sendToken: async (payload, tempKey, expire) => {
    const roleType = payload.role_type;
    let privateKey = "";
    switch (roleType) {
      case "Cluster":
        privateKey = process.env.CLUSTER_KEY;
        break;
      case "Admin":
        privateKey = process.env.ADMIN_KEY;
        break;
      case "Manager":
        privateKey = process.env.MANAGER_KEY;
        break;
      case "ClusterLead":
        privateKey = process.env.CLUSTER_LEAD_KEY;
        break;
      case "CountryLead":
        privateKey = process.env.COUNTRY_LEAD_KEY;
        break;
      case "Business":
        privateKey = process.env.BUSINESS_KEY;
        break;

      default:
        privateKey = "";
        break;
    }
    const key = tempKey ? tempKey : privateKey;
    const expiresIn = expire ? expire : `${1 * 30 * 24 * 60 * 60}s`;

    //Options for cookie
    return Promise.resolve(jwt.sign(payload, key, { expiresIn: expiresIn }));
  },

  bcryptPass: async (password) => {
    var salt = bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hashSync(password, salt);
    return hashPassword; // Promise.resolve(bcrypt.hashSync(password, salt));
  },

  uniqueKey: async () => {
    const [[lastUser]] = await pool.promise().execute(`SELECT *
        FROM logins
        ORDER BY _id DESC
        LIMIT 1;`);
    let lastUniqueId = 0;
    if (lastUser) {
      lastUniqueId = parseInt(lastUser.unique_id.slice(-4));
    } //lastUniqueId
    let value = "0105240075";
    const nextUniqueId = (lastUniqueId + 1).toString().padStart(4, "0");

    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const formatDate = `${month}${day}${year}`;

    const uniqueId = `${formatDate}${nextUniqueId}`;
    return uniqueId;
  },

  generateSecretKey: async () => {
    const min = 1000; // Minimum value for 4-digit password (inclusive)
    const max = 9999; // Maximum value for 4-digit password (inclusive)
    const password = Math.floor(Math.random() * (max - min + 1) + min);
    return password;
  },

  generateFollowupDate: async (date = new Date(), datePlus = 2) => {
    // let dateplus = 2;
    var newDate = new Date(date);
    newDate.setDate(newDate.getDate() + datePlus);
    let updateDate = new Date(newDate.setHours(0, 0, 0, 0));
    // followup_date: updateDate,
    return updateDate;
  },
  // db.collection.updateMany({},{ $set: { followup_date: new Date(new Date("$createdAt").setDate("$createdAt".getDate() + datePlus).setHours(0, 0, 0, 0)) } })
};

module.exports = helperFunctions;
