const express = require("express");
const { teacherSearch } = require("../controllers/searchControllers");
const route =  express.Router();

route.route("/").get(teacherSearch);

module.exports = route;