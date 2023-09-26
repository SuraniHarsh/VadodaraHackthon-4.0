const asyncHandler = require("express-async-handler");
const { getTeachersByLocationAndRating } = require("../utils/filterUtils");
const TeacherProfile = require("../models/TeacherProfileSModel");

/**
 * @desc Get teacher profile by user ID
 * @route GET /api/v1/teacher/profile
 * @access Private
 */
const teacherProfile = asyncHandler(async (req, res) => {
  try {

    const userId = req.user._id;

    const teacherProfile = await TeacherProfile.findOne({
      user_id: userId,
    }).populate('user_id');

    if (!teacherProfile) {
      res.status(404)
      .json({
         error: "Teacher profile not found"
        });
      return;
    }

    res.status(200).json(teacherProfile);

  } catch (error) {
    res.status(500)
    .json({
      message : error.message,
      error : error
    })
  }
});

/**
 * @desc Get teachers by location and rating
 * @route GET /api/v1/teacher/suggestion
 * @access Public
 */
const teachersByLocationAndRating = asyncHandler(async (req, res) => {
  try {
    const { location, page = 1, pageSize = 4 } = req.query;

    if (!location) {
      return res.status(400)
              .json({
                error: "Location parameter is required"
                });
    }

    const teachersByRating = await getTeachersByLocationAndRating(
      location,
      page,
      pageSize
    );

    res.json(teachersByRating);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = {
  teachersByLocationAndRating,
  teacherProfile
};
