const { validationResult } = require('express-validator');
const Post = require('../models/Post');

exports.createPost = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const { title, text } = req.body;
    const post = new Post({ title, text, authorId: req.user.id });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const { sort = 'desc' } = req.query; 
    const posts = await Post.find({ authorId: req.user.id }).sort({ createdAt: sort === 'asc' ? 1 : -1 });
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const deleted = await Post.findOneAndDelete({ _id: postId, authorId: req.user.id });
    if (!deleted) return res.status(404).json({ message: 'Post not found or not yours' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
