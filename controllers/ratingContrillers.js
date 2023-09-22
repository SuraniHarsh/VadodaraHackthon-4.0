const asyncHandler = require("express-async-handler");
const StudentProfile = require("../models/StudentProfileModel");
const Rating = require("../models/ratingModel");
const { updateTeacherAverageRating } = require("../utils/ratingUtils");


/**
 * @desc Create a new rating and update teacher's average rating
 * @route POST /api/v1/ratings
 * @access Private
 */
const rating = asyncHandler(async (req, res) => {
try {

    const userId = req.user._id;

    const studentProfile = await StudentProfile.findOne({
        user_id: userId,
    });

    if (!studentProfile) {
      res.status(404).json({ error: "Student profile not found" });
      return;
    }

    const student_id = studentProfile._id;

    const { teacher, rating, comment } = req.body;

    if (!teacher, !rating) {
         res
           .status(400)
           .json({
             error: "teacherProfileId and ratingValue are required fields",
           });
         throw new Error(
           "teacherProfileId and ratingValue are required fields"
         );
    }

    const newRating = await Rating.create({
        student : student_id,
        teacher,
        rating,
        comment
    });

try {
  await updateTeacherAverageRating(teacher);
} catch (error) {
  console.error("Error updating teacher's average rating:", error);
  // Handle the error as needed
}

    if (newRating) {
        res.status(201).json({ message: "Rating saved successfully" });
    }

} catch (error) {
    res.status(500)
    .json({
            message: "An error occurred while saving the rating",
            error : error
        });
    }
});


module.exports = rating;
