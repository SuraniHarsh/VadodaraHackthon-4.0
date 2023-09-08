const express = require("express");
const validateTocken = require("../middleware/authMiddleware");
const { sendRequest, pendingRequests, studentRequests, teacherRequests, acceptDeclineRequest, cancelRequest, getRequestById } = require("../controllers/lessonRequestControllers");
const route = express.Router();

route.use(validateTocken);
route.route("/send-request").post(sendRequest);
route.route("/pending-requests").get(pendingRequests);
route.route("/student-requests").get(studentRequests);
route.route("/teacher-requests").get(teacherRequests);
route.route("/acceptdecline/:requestId").put(acceptDeclineRequest);
route.route("/cancel-request/:requestId").delete(cancelRequest);
route.route("/request/:requestId").get(getRequestById);

module.exports = route;