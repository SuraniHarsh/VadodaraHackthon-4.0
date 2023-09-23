const teacherProfile = require("../models/TeacherProfileSModel");

const getTeachersByLocationAndRating = async (
  location,
  page = 1,
  pageSize = 10
) => {
  try {
    const regexLocation = new RegExp(location, "i"); // "i" for case-insensitive

    const pipeline = [
      {
        $match: {
          location: { $regex: regexLocation },
        },
      },
      {
        $sort: {
          rating: -1,
        },
      },
      {
        $skip: (page - 1) * pageSize,
      },
      {
        $limit: pageSize,
      },
    ];

    const teachers = await teacherProfile.aggregate(pipeline);
    return teachers;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getTeachersByLocationAndRating,
};
