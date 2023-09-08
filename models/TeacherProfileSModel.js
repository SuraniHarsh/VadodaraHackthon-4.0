const mongoose = require('mongoose');

const teacherProfileSchema = new mongoose.Schema({

  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

  first_name: { type: String, required: true, trim: true },

  last_name: { type: String, required: true, trim: true },

  expertise: [{ type: String, trim: true, required: true }],

  rating: { type: Number, default: 0 },

  lesson_count: { type: Number, default: 0 },

  lesson_duration: { type: Number, default: 0 },

  lessons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }], 

  location: { type: String, trim: true, required: true },
  
  about_me: { type: String, trim: true, required: true }, 
},{
    timestamps : true,
});

const TeacherProfile = mongoose.model('TeacherProfile', teacherProfileSchema);

module.exports = TeacherProfile;
