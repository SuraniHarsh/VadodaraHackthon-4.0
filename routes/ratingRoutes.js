const express = require("express");
const validateTocken = require("../middleware/authMiddleware");
const rating = require("../controllers/ratingContrillers");
const route = express.Router();

route.route("/").get(rating);

module.exports = route;