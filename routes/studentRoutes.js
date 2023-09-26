const express = require("express");
const validateTocken = require("../middleware/authMiddleware");
const { 
    studentProfile 
} = require("../controllers/studentControllers");
const route = express.Router();

route.route("/profile").get(validateTocken, studentProfile)

module.exports = route;