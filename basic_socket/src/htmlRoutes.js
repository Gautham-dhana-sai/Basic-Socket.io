const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");
const buffer = require("buffer").Buffer;

const socket = fs.readFileSync("./src/html/socket.html").toString();
const input = fs.readFileSync("./src/html/input.html").toString();

var data = [];
var message = "";

router.use(bodyParser.urlencoded({ extended: false }));

router.post("/submit", (req, res) => {
  console.log(req.body, "req is");
  data = [...data, req.body.message];
  message = "";
  console.log(req.url, "the url");
  if (req.url == "/submit") {
    for (let i of data) {
      res.write(i);
    }
  }
  console.log(data);
  // res.end();
});

router.use("/", (req, res) => {
  // console.log(req, "this is req");
  res.write(socket);
  res.write(input);
  res.end();
});

module.exports = router;
