const express = require('express');
const Post = require('../models/Post');
const User = require('../models/User');
const router = express.Router();

// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('author', 'username firstName lastName')
      .populate('likes', 'username')
      .populate('comments.user', 'username firstName lastName')
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: posts.length,
      data: posts
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

// Get single post
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'username firstName lastName')
      .populate('likes', 'username')
      .populate('comments.user', 'username firstName lastName');
    
    if (!post) {
      return res.status(404).json({
        success: false,
        error: 'Post not found'
      });
    }
    
    res.json({
      success: true,
      data: post
    });
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

// Create new post
router.post('/', async (req, res) => {
  try {
    const { content, authorUsername } = req.body;
    
    // Find the author
    const author = await User.findOne({ username: authorUsername });
    if (!author) {
      return res.status(404).json({
        success: false,
        error: 'Author not found'
      });
    }
    
    const post = new Post({
      content,
      author: author._id
    });
    
    await post.save();
    
    // Add post to user's posts array
    author.posts.push(post._id);
    await author.save();
    
    // Populate the response
    await post.populate('author', 'username firstName lastName');
    
    res.status(201).json({
      success: true,
      message: 'Post created successfully',
      data: post
    });
  } catch (error) {
    console.error('Error creating post:', error);
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

// Update post
router.put('/:id', async (req, res) => {
  try {
    const { content } = req.body;
    
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { content },
      { new: true, runValidators: true }
    ).populate('author', 'username firstName lastName');
    
    if (!post) {
      return res.status(404).json({
        success: false,
        error: 'Post not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Post updated successfully',
      data: post
    });
  } catch (error) {
    console.error('Error updating post:', error);
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

// Delete post
router.delete('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({
        success: false,
        error: 'Post not found'
      });
    }
    
    // Remove post from user's posts array
    await User.findByIdAndUpdate(post.author, {
      $pull: { posts: post._id }
    });
    
    await Post.findByIdAndDelete(req.params.id);
    
    res.json({
      success: true,
      message: 'Post deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

// Like/Unlike post
router.post('/:id/like', async (req, res) => {
  try {
    const { username } = req.body;
    
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }
    
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({
        success: false,
        error: 'Post not found'
      });
    }
    
    const isLiked = post.likes.includes(user._id);
    
    if (isLiked) {
      // Unlike
      post.likes = post.likes.filter(likeId => !likeId.equals(user._id));
    } else {
      // Like
      post.likes.push(user._id);
    }
    
    await post.save();
    await post.populate('author', 'username firstName lastName');
    await post.populate('likes', 'username');
    
    res.json({
      success: true,
      message: isLiked ? 'Post unliked' : 'Post liked',
      data: post
    });
  } catch (error) {
    console.error('Error liking/unliking post:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

// Add comment to post
router.post('/:id/comments', async (req, res) => {
  try {
    const { username, content } = req.body;
    
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }
    
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({
        success: false,
        error: 'Post not found'
      });
    }
    
    post.comments.push({
      user: user._id,
      content
    });
    
    await post.save();
    await post.populate('author', 'username firstName lastName');
    await post.populate('comments.user', 'username firstName lastName');
    
    res.json({
      success: true,
      message: 'Comment added successfully',
      data: post
    });
  } catch (error) {
    console.error('Error adding comment:', error);
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

// Get posts by user
router.get('/user/:username', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }
    
    const posts = await Post.find({ author: user._id })
      .populate('author', 'username firstName lastName')
      .populate('likes', 'username')
      .populate('comments.user', 'username firstName lastName')
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: posts.length,
      data: posts
    });
  } catch (error) {
    console.error('Error fetching user posts:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

module.exports = router; 