const mongoose = require('mongoose');

const studentProfileSchema = new mongoose.Schema({

  user_id: { type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true },

  first_name: { type: String, 
    required: true, 
    trim: true },

  last_name: { type: String, 
    required: true, 
    trim: true },

  interests: [{ type: String, 
    trim: true, 
    required: true }],

  enrolled_courses: [{ type: mongoose.Schema.Types.ObjectId, 
    ref: 'Course' }],

  location: { type: String, 
    trim: true, 
    required: true },

  about_me: { type: String, 
    trim: true, 
    required: true }, 
},{
    timestamps : true,
});

const StudentProfile = mongoose.model('StudentProfile', studentProfileSchema);

module.exports = StudentProfile;