const mongoose = require('mongoose');

const lessonRequestSchema = new mongoose.Schema({
  student_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'StudentProfile',
    required: true,
  },
  teacher_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TeacherProfile',
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'declined'],
    default: 'pending',
  },
  date: Date, 
  message: String,
},{
  timestamps : true
});

const LessonRequest = mongoose.model('LessonRequest', lessonRequestSchema);

module.exports = LessonRequest;
