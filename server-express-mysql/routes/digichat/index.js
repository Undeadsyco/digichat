const express = require('express');
const router = express.Router();
const path = require("path");

// app.use("/api", apiRouter);

router.get(/login|signup|feed|profile|group|static/,
  express.static(path.join(__dirname, "./public/build")),
  (req, res) => res.sendFile(path.join(__dirname, "./public/build/index.html"))
);

router.get('/', (req, res) => res.sendFile(path.join(__dirname, "./public/index.html")));

router.use(/((\/\w+)+)*\/?(\S+\.)+(png|jpg|ico|html|css|js|json)/, express.static(path.join(__dirname, "./public/build")));

module.exports = router;