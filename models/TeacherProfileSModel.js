const mongoose = require('mongoose');

// Define the Teacher Profile Schema
const teacherProfileSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  background: {
    type : String,
    required : true,
  },
  number : {
    type:String,
    required : true,
  },
  location: {
    type : String,
    required : true,
  },
  language: {
    type : String,
    required : true,
  },
  minimal_charge: {
    type : String,
    required : true,
  },
  skill_set: {
    type : [String],
    required : true,
  },
  rating: {
    type: Number,
    default: 0,
  },
  courses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course', // Reference to the Course schema
  }],
  about_me: {
    type : String,
    required : true,
  },
  linkedin : {
    type : String,
    required : true,
  },
  type_of_learning : {
    type : String,
    required : true,
  },
},{
  timestamps : true,
});

const TeacherProfile = mongoose.model('TeacherProfile', teacherProfileSchema);

module.exports = TeacherProfile;
