const asyncHandler = require("express-async-handler");
const lessonRequest = require("../models/lessonRequestModel");
const TeacherProfile = require("../models/TeacherProfileSModel");
const StudentProfile = require("../models/StudentProfileModel");

/**
 * @desc Send a lesson request
 * @route POST /api/v1/lessonRequest/send-request
 * @access Private
 */
const sendRequest = asyncHandler(async (req, res) => {
    try {

        const userId = req.user._id;

        const studentProfile = await StudentProfile.findOne({ user_id: userId });

        if (!studentProfile) {
            res.status(404).json({ error: 'Student profile not found' });
            return; 
        }

        const student_id = studentProfile._id;

        const { teacher_id, date, message } = req.body;
    
        if (!teacher_id || !date) {
            res.status(400).json({ error: 'teacher_id and date are required fields' });
            throw new Error("teacher_id and date are required fields");
        }
    
        const lessonReq =  await lessonRequest.create({
            student_id,
            teacher_id,
            date,
            message,
            status: 'pending',
          });
    
        res.status(201).json({ message: 'Request sent successfully', request: lessonReq });
    } catch (error) {
        res.status(500).json({ error: 'Request sending failed' });
    }
  });

  /**
   * @desc Get pending lesson requests
   * @route GET /api/v1/lessonRequest/pending-requests
   * @access Private
   */
  const pendingRequests = asyncHandler(async (req, res) => {
    try {
        
        const userId = req.user._id;

        const teacherProfile = await TeacherProfile.findOne({ user_id: userId });

        if (!teacherProfile) {
            res.status(404).json({ error: 'Teacher profile not found' });
            return;
          }
        
        const teacher_id = teacherProfile._id;
        
        const pendingRequests = await lessonRequest.find({ teacher_id, status: 'pending' })
            .populate('student_id')
            .exec();

        res.status(200).json({PendingRequests : pendingRequests});
    } catch (error) {
        res.status(500).json({ message : 'Error fetching pending requests', error : error.message });
    }
  });
  
  /**
   * @desc Get lesson requests from students
   * @route GET /api/v1/lessonRequest/student-requests
   * @access Private
   */
  const studentRequests = asyncHandler(async (req, res) => {
    try {
      const userId = req.user._id;

      const studentProfile = await StudentProfile.findOne({user_id : userId});
      
      if (!studentProfile) {
        res.status(404).json({ error: 'Student profile not found' });
        return;
      }

      const student_id = studentProfile._id;

      const studentRequests = await lessonRequest.find({student_id})
          .populate('teacher_id')
          .exec();

      res.status(200).json({studentRequests : studentRequests});

    } catch (error) {
      
      res.status(500).json({message : "Error fetching requests", error : error.message })

    }
  });
  
  /**
   * @desc Get lesson requests from teachers
   * @route GET /api/v1/lessonRequest/teacher-requests
   * @access Private
   */
  const teacherRequests = asyncHandler(async (req, res) => {
    try {
      const userId = req.user._id;

      const teacherProfile = await TeacherProfile.findOne({user_id : userId});
      
      if (!teacherProfile) {
        res.status(404).json({ error: 'Teacher profile not found' });
        return;
      }

      const teacher_id = teacherProfile._id;

      const teacherRequests = await lessonRequest.find({teacher_id})
          .populate('student_id')
          .exec();


      res.status(200).json({teacherRequests : teacherRequests});

    } catch (error) {
      
      res.status(500).json({message : "Error fetching requests", error : error.message })

    }
  });
  
  /**
   * @desc Accept or decline a lesson request
   * @route PUT /api/v1/lessonRequest/acceptdecline/:requestId
   * @access Private
   */
  const acceptDeclineRequest = asyncHandler(async (req, res) => {
    try {
      const requestId = req.params.requestId;
      const { action } = req.body;
      const userId = req.user._id;

      const teacherProfile = await TeacherProfile.findOne({user_id : userId});
      
      if (!teacherProfile) {
        res.status(404).json({ error: 'Teacher profile not found' });
        return;
      }

      const teacher_id = teacherProfile._id;

      const request = await lessonRequest.findById(requestId);

      if (!request) {
        res.status(404).json({ error: 'Lesson request not found' });
        return;
      }

      if (request.teacher_id.toString() !== teacher_id.toString()) {
        res.status(403).json({ error: 'Access denied. You are not the owner of this request' });
        return;
      }

      if (action === 'accept') {
        request.status = "accepted";
      } else if(action === 'decline') {
        request.status = "declined";
      } else {
        res.status(400).json({ error: 'Invalid action. Use "accept" or "decline".' });
        return;
      }

      await request.save();

      res.status(200).json({ message: 'Request updated successfully', request : request })

    } catch (error) {
      res.status(500).json({ message: 'Error updating request', error : error.message }); 
    }
  });
  
  /**
   * @desc Cancel a lesson request
   * @route DELETE /api/v1/lessonRequest/cancel-request/:requestId
   * @access Private
   */
  const cancelRequest = asyncHandler(async (req, res) => {
    try {
      const requestId = req.params.requestId;
      
      const userId = req.user._id;

      const studentProfile = await StudentProfile.findOne({user_id : userId});

      const student_id = studentProfile._id;

      const request = await lessonRequest.findById(requestId);

      if (!request) {
        res.status(404).json({error : 'Lesson request not found'});
        return;
      }

      if (request.student_id.toString() !== student_id.toString()) {
        res.status(403).json({ error: 'Access denied. You are not the owner of this request' });
        return;
      }

      await lessonRequest.findByIdAndRemove(requestId);

      res.status(200).json({ message: 'Request canceled successfully' });
    } catch (error) {
      res.status(500).json({ message : 'Error canceling request', error : error.message });
    }

  });
  
  /**
   * @desc Get a specific lesson request by ID
   * @route GET /api/v1/lessonRequest/request/:requestId
   * @access Private
   */
  const getRequestById = asyncHandler(async (req, res) => {
    try {
      const requestId = req.params.requestId;

      const request = await lessonRequest.findById(requestId).populate('teacher_id').populate('student_id');
      
      if (!request) {
        res.status(404).json({ error: 'Lesson request not found' });
        return;
      }
  
      res.status(200).json({request : request});
    } catch (error) {
      res.status(500).json({ message: 'Error fetching request', error : error.message });
    }

  });
  
  module.exports = {
    sendRequest,
    pendingRequests,
    studentRequests,
    teacherRequests,
    acceptDeclineRequest,
    cancelRequest,
    getRequestById,
  };
  