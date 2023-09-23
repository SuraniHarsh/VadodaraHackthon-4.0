const express = require("express");
const {
  teachersByLocationAndRating,
} = require("../controllers/teacherControllers");
const route = express.Router();

route.route("/suggestion").get(teachersByLocationAndRating);

module.exports = route;
