const asyncHandler = require("express-async-handler");
const { getTeachersByLocationAndRating } = require("../utils/filterUtils");

const teachersByLocationAndRating = asyncHandler(async (req, res) => {
  try {
    const { location, page = 1, pageSize = 4 } = req.query;

    if (!location) {
      return res.status(400).json({ error: "Location parameter is required" });
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
};
