const express = require("express");
const {registerUser, loginUser, getCurrentUser} = require("../controllers/authControllers")
const validateTocken = require("../middleware/authMiddleware");
const route = express.Router();

route.route("/register").post(registerUser);
route.route("/login").post(loginUser);
route.route("/user").get(validateTocken,getCurrentUser);

module.exports = route;