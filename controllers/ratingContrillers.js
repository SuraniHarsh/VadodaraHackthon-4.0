const asyncHandler = require("express-async-handler");
const StudentProfile = require("../models/StudentProfileModel");
const Rating = require("../models/ratingModel");


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

    const {teacherProfileId, ratingValue, comment} = req.body;

    if (!teacherProfileId, !ratingValue) {
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
        student_id,
        teacherProfileId,
        ratingValue,
        comment
    });

    if (newRating) {
        res.status(201).json({ message: "Rating saved successfully" });
    }

} catch (error) {
    res.status(500)
    .json({
            message: "An error occurred while saving the rating",
            error : error.message
        });
    }
});


module.exports = rating;
