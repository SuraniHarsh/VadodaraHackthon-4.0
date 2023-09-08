const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: { 
    type: String,
    required: true },
  email: {
    type: String, 
    required: true, 
    unique: true },
  password: { 
    type: String, 
    required: true },
  role: { 
    type: String, 
    enum: ['student', 'teacher'], 
    required: true }
},{
  timestamps : true,
});

// Hash the user's password before saving it to the database
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (err) {
    return next(err);
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;