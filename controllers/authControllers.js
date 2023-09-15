const asyncHandler = require("express-async-handler");
const { validationResult } = require('express-validator');
const User = require("../models/userModel");
const StudentProfile = require("../models/StudentProfileModel");
const TeacherProfile = require("../models/TeacherProfileSModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/**
 * @desc Register a new user
 * @route POST /api/v1/auth/register
 * @access Public
 */
const registerUser = async (req, res) => {
    try {
      const errors = validationResult(req);
  
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const { 
        username, email, password, role, language, background, minimal_charge,
        interests, location, about_me, type_of_learning, linkedin, number,  
        skill_set } = req.body;
  
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ message: 'User already registered' });
      }
  
      const user = await User.create({
        username,
        email,
        password,
        role,
      });
      
      let userProfile;
      if (user) {
        if (role === 'student') {
          userProfile = await StudentProfile.create({ 
            user_id: user._id, 
            username,
            number,
            type_of_learning,
            linkedin,
            interests, 
            location, 
            about_me });
        } else if (role === 'teacher') {
           userProfile = await TeacherProfile.create({ 
            user_id: user._id, 
            username, 
            background,
            number,
            location,
            language,
            minimal_charge,
            skill_set, 
            about_me,
            linkedin,
            type_of_learning,
           });
        }

        if (userProfile) {
            return res.status(201).json({
                message: 'User registered successfully',
                User: {
                  _id: user._id,
                  username: user.username,
                  email: user.email,
                  role: user.role,
                }
              });
        } else {
            return res.status(400).json({ message: 'Failed to create user profile' });
        }

      } else {
        return res.status(400).json({ message: 'User data is not valid' });
      }
    } catch (error) {
      return res.status(500).json({ message: 'Error in User Register', Error: error.message });
    }
  };

/**
 * @desc Log in a user
 * @route POST /api/v1/auth/login
 * @access Public
 */
const loginUser = asyncHandler(async(req, res) =>{
    try {
        const {email , password} = req.body;

        if (!email || !password) {
            res.status(400);
            throw new Error ("All fildes are mandatory");
        }

        const user = await User.findOne({email});

        if (user && (await bcrypt.compare(password, user.password))) {
            const accessToken = jwt.sign({
                user : { 
                    username : user.username,
                    emial : user.email,
                    role : user.role,
                    _id : user.id
                }
            },process.env.ACCESS_TOKEN_SECERT,
            {expiresIn : "1h"});
            res.status(200).json({ accessToken });
        }else{
            res.status(401);
            throw new Error("email or password is not valid");
        }

    } catch (error) {
        res.status(400).json({Error : "Login User", message : error.message});
    }
});

/**
 * @desc Get the information of the currently authenticated user
 * @route GET /api/v1/auth/user
 * @access Private
 */
const getCurrentUser = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};


module.exports = {  registerUser,
                    loginUser,
                    getCurrentUser}
