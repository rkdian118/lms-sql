const { spawn } = require("child_process");
const path = require("path");
const cron = require("node-cron");
const { google } = require("googleapis");
var moment = require("moment");
const fs = require("fs");
const archiver = require("archiver");
// Configuring the google
const dbConfig = require("./db");
// require('dotenv').config()
// const PASSWORD = encodeURIComponent(process.env.MONGO_PWD);

console.log("Database backup func");
cron.schedule("10 00 * * *", async () => {
  try {
    const DATE = moment().format("DD-MM");
    const BACKUP_DIR = path.join(__dirname, "../Uploads/databaseBackups/");
    const BACKUP_FILENAME = `${DATE}.sql`;
    const BACKUP_PATH = path.join(BACKUP_DIR, BACKUP_FILENAME);
    const ZIP_PATH = path.join(BACKUP_DIR, `${DATE}.zip`);

    // Ensure the backup directory exists
    if (!fs.existsSync(BACKUP_DIR)) {
      fs.mkdirSync(BACKUP_DIR, { recursive: true });
    }

    // Spawn the mysqldump process
    const mysqldump = spawn("mysqldump", [
      "-u",
      process.env.DB_USER,
      "-p" + process.env.DB_PASSWORD,
      "-h",
      process.env.DB_HOST,
      "-P",
      process.env.DB_PORT || "3306",
      process.env.DB_NAME,
      "--single-transaction",
      "--quick",
    ]);

    // Create a write stream for the backup file
    const backupFile = fs.createWriteStream(BACKUP_PATH);
    mysqldump.stdout.pipe(backupFile);

    // Event handlers
    mysqldump.stderr.on("data", (data) => {
      console.error(`stderr: ${data}`);
    });

    mysqldump.on("error", (error) => {
      console.error(`error: ${error.message}`);
    });

    mysqldump.on("close", (code) => {
      if (code === 0) {
        console.log(`MySQL backup successful. File saved at ${BACKUP_PATH}`);

        // Create a ZIP archive
        const output = fs.createWriteStream(ZIP_PATH);
        const archive = archiver("zip", { zlib: { level: 9 } });
        output.on("close", () => {
          console.log(
            `Backup archived successfully. Archive saved at ${ZIP_PATH}`
          );
        });
        archive.pipe(output);
        archive.file(BACKUP_PATH, { name: BACKUP_FILENAME });
        archive.finalize();
      } else {
        console.error(`MySQL backup failed with code ${code}`);
      }
    });
  } catch (err) {
    console.error(err);
  }
});

cron.schedule("20 00 * * *", async () => {
  try {
    const ID_OF_THE_FOLDER = dbConfig.driveCreds.folder_id;
    const pageToken = null;
    const CLIENT_ID = dbConfig.driveCreds.client_id;
    const CLIENT_SECRET = dbConfig.driveCreds.client_secret;
    const REDIRECT_URI = dbConfig.driveCreds.redrict_url;

    //refresh token
    const REFRESH_TOKEN = dbConfig.driveCreds.refresh_token;

    //intialize auth client
    const oauth2Client = new google.auth.OAuth2(
      CLIENT_ID,
      CLIENT_SECRET,
      REDIRECT_URI
    );

    //setting outr credentials
    oauth2Client.setCredentials({
      refresh_token: REFRESH_TOKEN,
    });

    //initialize google drive
    const drive = google.drive({
      version: "v3",
      auth: oauth2Client,
    });

    var DATE = moment().format("DD-MM");
    const ARCHIVE_PATH = path.join(
      __dirname,
      "../Uploads/databaseBackups/" + DATE + ".zip"
    );
    const listed = await drive.files.list({
      q: `'${ID_OF_THE_FOLDER}' in parents and trashed=false`,
      fields: "nextPageToken, files(id, name, mimeType)",
      spaces: "drive",
      pageToken: pageToken,
    });
    let obj = listed.data.files.find((o) => o.name === DATE + ".zip");

    if (!obj) {
      const created = drive.files.create({
        resource: {
          name: DATE + ".zip",
          parents: [ID_OF_THE_FOLDER],
        },
        media: {
          mimeType: "lmsweb-app/zip",
          body: fs.createReadStream(ARCHIVE_PATH),
        },
      });
      console.log("creates ", created.data);
    } else {
      let updated = drive.files.update({
        fileId: obj.id,
        resource: {
          name: DATE + ".zip",
        },
        media: {
          mimeType: "lmsweb-app/zip",
          body: fs.createReadStream(ARCHIVE_PATH),
        },
      });
      console.log("updates ", updated.data);
    }
  } catch (err) {
    console.log(err);
  }
});

// var fileMetadata = {
//   name: "MongoDB-BackUp/LMS_LIVE",
//   mimeType: "application/vnd.google-apps.folder",
// };
// drive.files.create(
//   {
//     resource: fileMetadata,
//     fields: "id",
//   },
//   function (err, file) {
//     if (err) {
//       // Handle error
//       console.error(err);
//     } else {
//       console.log("Folder Id: ", file.data);
//     }
//   }
// );

