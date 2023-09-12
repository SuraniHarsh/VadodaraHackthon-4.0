const asyncHandler = require("express-async-handler");
const TeacherProfile = require("../models/TeacherProfileSModel");

/**
 * @desc Search for teacher profiles by first name or last name
 * @route GET /api/v1/teachers/search
 * @access Public
 * @param {string} q - The search query for the teacher's first name or last name
 */
const teacherSearch = asyncHandler(async (req, res) => {
    try {
      const { q } = req.query;
  
      if (!q) {
        return res.status(400).json({ error: "Search query is missing." });
      }
  
      const teacherProfiles = await TeacherProfile.find({
        $or: [
            { first_name: { $regex: q, $options: "i" } },
            { last_name: { $regex: q, $options: "i" } },
          ],
      });
  
      if (teacherProfiles.length === 0) {
        return res.status(404).json({ error: "No teacher profiles found." });
      }
  
      res.status(200).json({ teacherProfiles });
    } catch (error) {
      res.status(500).json({ message: "error in teacherSearch", error : error.message });
    }
});


/**
 * @desc Search for student profiles by first name or last name
 * @route GET /api/v1/students/search
 * @access Public
 * @param {string} q - The search query for the student's first name or last name
 */
const studentSearch = asyncHandler(async (req, res) => {
    try {
      const { q } = req.query;
  
      if (!q) {
        return res.status(400).json({ error: "Search query is missing." });
      }
  
      const studentProfiles = await StudentProfile.find({
        $or: [
          { first_name: { $regex: q, $options: "i" } },
          { last_name: { $regex: q, $options: "i" } },
        ],
      });
  
      if (studentProfiles.length === 0) {
        return res.status(404).json({ error: "No student profiles found." });
      }
  
      res.status(200).json({ studentProfiles });
    } catch (error) {
      res.status(500).json({ error: "Internal server error." });
    }
});  

module.exports = {
    teacherSearch,
    studentSearch
};