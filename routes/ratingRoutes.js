const express = require("express");
const validateTocken = require("../middleware/authMiddleware");
const rating = require("../controllers/ratingContrillers");
const route = express.Router();

route.route("/").post(validateTocken,rating);

module.exports = route;