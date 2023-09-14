const express = require("express");
const { teacherSearch, studentSearch } = require("../controllers/searchControllers");
const route =  express.Router();

route.route("/teacher").get(teacherSearch);
route.route("/student").get(studentSearch);

module.exports = route;