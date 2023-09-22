const Rating = require("../models/ratingModel");
const TeacherProfile = require("../models/TeacherProfileSModel");

const updateTeacherAverageRating = async (teacherProfileId) => {
  try {
    // Query all ratings for the teacher
    const ratings = await Rating.find({ teacher: teacherProfileId });

    // Calculate the average rating
    if (ratings.length > 0) {
      const totalRating = ratings.reduce(
        (sum, rating) => sum + rating.rating,
        0
      );
      const averageRating = totalRating / ratings.length;

      // Update the TeacherProfile with the average rating
      await TeacherProfile.findByIdAndUpdate(
        teacherProfileId,
        { rating: averageRating },
        { new: true } // This option returns the updated document
      );

      console.log("Average rating updated:", averageRating);
    } else {
      // Handle the case where there are no ratings yet (optional)
      console.log("No ratings available for this teacher.");
    }
  } catch (error) {
    console.error("Error updating average rating:", error);
  }
};

module.exports = {
  updateTeacherAverageRating,
};
