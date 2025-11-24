const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title:   { type: String, required: true },
  text:    { type: String, required: true },
  authorId:{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: { createdAt: 'createdAt' } });

module.exports = mongoose.model('Post', postSchema);
