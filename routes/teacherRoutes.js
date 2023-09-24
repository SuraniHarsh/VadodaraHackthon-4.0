const express = require("express");
const {
  teachersByLocationAndRating, teacherProfile,
} = require("../controllers/teacherControllers");
const validateTocken = require("../middleware/authMiddleware");
const route = express.Router();

route.route("/suggestion").get(teachersByLocationAndRating);
route.route("/profile").get(validateTocken, teacherProfile);

module.exports = route;
