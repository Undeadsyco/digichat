require('dotenv').config({ path: ['.env', '.env.development'], override: false });
const path = require("path");
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const models = require("./models");

const apiRouter = require("./routes/api");

const app = express();

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Credentials', 'true')
  next();
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use("/api", apiRouter);

app.get(/login|signup|feed|profile|group|static/,
  express.static(path.join(__dirname, "./public/build")),
  (req, res) => res.sendFile(path.join(__dirname, "./public/build/index.html"))
);

app.get('/', (req, res) => res.sendFile(path.join(__dirname, "./public/index.html")));

app.use(/((\/\w+)+)*\/?(\S+\.)+(png|jpg|ico|html|css|js|json)/, express.static(path.join(__dirname, "./public/build")));

app.use(function ({ error }, req, res, next) {
  if (!error) next();

  console.error("error", error);
  // write error to log if created and create if not

  res.status(500).end("Something broke!");
});

app.use(function (req, res, next) {
  res.status(404).end();
});

models.sequelize.sync();

module.exports = app;
