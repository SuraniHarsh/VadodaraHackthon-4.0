const asyncHandler = require("express-async-handler");
const StudentProfile = require("../models/StudentProfileModel");

/**
 * @desc Get student profile by user ID
 * @route GET /api/v1/student/profile
 * @access Private
 */
const studentProfile = asyncHandler(async (req, res) => {
    try {
        
        const userId = req.user._id;

        const studentProfile = await StudentProfile.findOne({
            user_id : userId
        }).populate('user_id')

        if(!studentProfile){
            res.status(404)
            .json({
                error: "Teacher profile not found"
            });
        return;
        }

        res.status(200).json(studentProfile);

    } catch (error) {
        res.status(500)
    .json({
      message : error.message,
      error : error
    })
    }
});

module.exports = {
    studentProfile
}