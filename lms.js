const express = require("express");
const cors = require("cors");
const ErrorHandler = require("./Utils/errorHandler");
const env = require("dotenv");
const path = require("path");
const cron = require("node-cron");
const https = require("https");
env.config(".env");
const fs = require("fs");
// const passport = require('passport');

const db = require("./config/db");
const { errorMiddleware } = require("./middleware/resHandler");
const { decodeFormData } = require("./helper/proposalDocHelper");
let task = require("./service/AdminService/adminTargService");
const {
  generateBranchTarget,
  generateManagerTarget,
  generateBDTarget,
} = require("./helper/cronHelper");

const port = process.env.PORT || 10003; // 10024;
global.pool = db.connection();
const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(decodeFormData);

///////////////////////////////   for react build Start  /////////////////////////////////////////
app.use(express.static(__dirname + "/Uploads/"));
// ---- SERVE APLICATION PATHS ---- //
app.all("/LmsAdmin/", function (req, res) {
  res
    .status(200)
    .sendFile(path.join(__dirname, "Uploads", "LmsAdmin", "index.html"));
});
app.all("/LmsAdmin/*", function (req, res) {
  res
    .status(200)
    .sendFile(path.join(__dirname, "Uploads", "LmsAdmin", "index.html"));
});

// app.use(express.static(__dirname + './react-admin-lms/'));
// // ---- SERVE APLICATION PATHS ---- //
// app.all('/LmsAdmin/', function (req, res) {
// 	res
// 		.status(200)
// 		.sendFile(path.join(__dirname, 'react-admin-lms', 'build', 'index.html'));
// });
// app.all('/LmsAdmin/*', function (req, res) {
// 	res
// 		.status(200)
// 		.sendFile(path.join(__dirname, 'react-admin-lms', 'build', 'index.html'));
// });

///////////////////////////////   for react build End  /////////////////////////////////////////

app.use("/Uploads", express.static(path.join(__dirname, "Uploads")));

app.use("/api", require("./routes/indexRoute"));
app.use(errorMiddleware);
if (process.env.isHttps && process.env.isHttps == "true") {
  require("./config/dbBackup");

  require("./scheduledCron");
  // this configuration done from certbot
  var httpsServer = https.createServer(
    {
      key: fs.readFileSync(
        "/etc/letsencrypt/live/newlms.webmobril.com/privkey.pem"
      ),
      cert: fs.readFileSync(
        "/etc/letsencrypt/live/newlms.webmobril.com/cert.pem"
      ),
      ca: [
        fs.readFileSync(
          "/etc/letsencrypt/live/newlms.webmobril.com/fullchain.pem"
        ),
      ],
    },
    app
  );
  httpsServer.listen(port, () => {
    console.log(
      `Server running on https://https://newlms.webmobril.com/:${port}`
    );
  });
} else {
  app.listen(port, () => {
    console.log(`Server running on http://52.22.241.165:${port}`);
  });
}

const exp = process.env.CRONEXP;
const adminId = process.env.ADMINID;
let currentDate = process.env.CURRDATE;
// console.log("process.env.CRONEXP: ", exp);
// console.log("process.env.ADMINID: ", adminId);
// console.log("process.env.CURRDATE: ", currentDate);
// console.log("task.scheduledTask: ",task?.scheduledTask);
// console.log("cron.get(jobData.cronExpression): ",cron.get(exp)?.stop());
if (exp && adminId) {
  console.log("If exp && adminId: ", exp, adminId);
  task.scheduledTask["taskId"] = cron.schedule(
    process.env.CRONEXP,
    async (req, res, next) => {
      // console.log("Thiswill run every second");
      // console.log("Cron helper request= ", req);
      //111 const branchTarg = await generateBranchTarget(adminId, currentDate);
      // const branchTarg = await cronHelper.generateBranchTarget(adminId);
      // console.log("branchTarg: ", branchTarg);
      // 111const ManagerTarg = await generateManagerTarget(adminId, currentDate);
      // 111const ClusterLeadTarg = await generateClusterLeadTarget(adminId, currentDate);
      // const ManagerTarg = await cronHelper.generateManagerTarget(adminId);
      // console.log("ManagerTarg: ", ManagerTarg);
      const bdTarg = await generateBDTarget(adminId, currentDate);
      // const bdTarg = await cronHelper.generateBDTarget(adminId);
      // console.log("bdTarg: ", bdTarg);
      // await generateBranchTarget(process.env.ADMINID);
      // await generateManagerTarget(process.env.ADMINID);
      // await generateBDTarget(process.env.ADMINID);
    }
  );
  // console.log("task.scheduledTask done: ",task?.scheduledTask);
  // let sch = JSON.stringify(task?.scheduledTask);
  // console.log("sch: ",sch);
  // const jobData = {
  // 	adminId: adminId,
  // 	jobReference: task?.scheduledTask,
  //   };
  //   console.log("jobData: ",jobData);
  // fs.writeFileSync('./Utils/scheduleTask.txt', JSON.stringify(jobData)); //JSON.stringify(task?.scheduledTask));
}
