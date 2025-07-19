const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

// Get single user by username
router.get('/:username', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username })
      .select('-password')
      .populate('posts');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }
    
    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

// Create new user
router.post('/', async (req, res) => {
  try {
    const { username, firstName, lastName, email, phone, password } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ 
      $or: [{ username }, { email }] 
    });
    
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: 'Username or email already exists'
      });
    }
    
    const user = new User({
      username,
      firstName,
      lastName,
      email,
      phone,
      password
    });
    
    await user.save();
    
    // Return user without password
    const userResponse = user.toJSON();
    delete userResponse.password;
    
    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: userResponse
    });
  } catch (error) {
    console.error('Error creating user:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        error: Object.values(error.errors).map(err => err.message)
      });
    }
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

// Update user
router.put('/:username', async (req, res) => {
  try {
    const { firstName, lastName, email, phone } = req.body;
    
    const user = await User.findOneAndUpdate(
      { username: req.params.username },
      { firstName, lastName, email, phone },
      { new: true, runValidators: true }
    ).select('-password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }
    
    res.json({
      success: true,
      message: 'User updated successfully',
      data: user
    });
  } catch (error) {
    console.error('Error updating user:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        error: Object.values(error.errors).map(err => err.message)
      });
    }
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

// Delete user
router.delete('/:username', async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ username: req.params.username });
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }
    
    res.json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

// Delete all users
router.delete('/', async (req, res) => {
  try {
    await User.deleteMany({});
    res.json({
      success: true,
      message: 'All users deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting all users:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

module.exports = router; 