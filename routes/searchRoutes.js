const express = require("express");
const { teacherSearch } = require("../controllers/searchControllers");
const route =  express.Router();

route.route("/teacher").get(teacherSearch);
route.route("/student").get(teacherSearch);

module.exports = route;