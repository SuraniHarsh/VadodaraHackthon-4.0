const mongoose = require('mongoose');

const studentProfileSchema = new mongoose.Schema({

  user_id: { type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true },

    username: { 
      type: String,
      required: true },

  interests: [{ type: String, 
    trim: true, 
    required: true }],

  enrolled_courses: [{ type: mongoose.Schema.Types.ObjectId, 
    ref: 'Course' }],

  location: { type: String, 
    trim: true, 
    },

  about_me: { type: String, 
    trim: true, 
    required: true },
    
    type_of_learning :{
      type : String,
      required : true
    },
    
    linkedin : {
      type : String,
    },

    number : {
      type : String,
      required : true
    }
    
},{
    timestamps : true,
});

const StudentProfile = mongoose.model('StudentProfile', studentProfileSchema);

module.exports = StudentProfile;
