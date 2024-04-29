const mongoose = require("mongoose");
const driveCreds = {
  url:
    process.env.isHttps && process.env.isHttps == "true"
      ? `${process.env.DB_URL_LIVE}`
      : `${process.env.DB_URL}`,
  client_id:
    "845886724418-j1077s5o4vcanmsk2b0n72vs2a4oief5.apps.googleusercontent.com",
  client_secret: "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",
  redrict_url: "https://developers.google.com/oauthplayground",
  refresh_token:
    "1//04STHaV1mR1_FCgYIARAAGAQSNgF-L9IrjAyRM1QxDUnq3ahPI_RU4CuXWbCSwY3Ulb2C9-IhGZwKkHQZZdllmmwuqKPViTLeNw",
  folder_id: "1r9wOiFg6NTJSly2cAHYjSVkFJn7J48BE",
  db_name: "lms",
};

console.log("NODE_ENV :", process.env.NODE_ENV);
if (process.env.NODE_ENV == "DEVELOPMENT") {
  // const url = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
  // const url = `${process.env.DB_URL}/${process.env.DB_NAME}`;
  let dburl =
    process.env.isHttps && process.env.isHttps == "true"
      ? `${process.env.DB_URL_LIVE}`
      : `${process.env.DB_URL}`;
  let dbname =
    process.env.isHttps && process.env.isHttps == "true"
      ? `${process.env.DB_NAME}`
      : `LMS`;
  const url = `${dburl}/${dbname}`; //DB_URL_LIVE //process.env.DB_NAME

  console.log("URL: ", url);
  mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log(`Mongodb connected with server:: ${url}`);
    })
    .catch((err) => {
      console.log("MongoDb Error : ", err);
      console.error(`MongoDB Connection Error: ${err}`);
    });
}

const mysql = require("mysql2");

// DB config
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

const connection = () => {
  pool = mysql.createPool(dbConfig);
  console.log(`DB Connected`);
  return pool;
};

module.exports = {
  connection,
  driveCreds,
};
