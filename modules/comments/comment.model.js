const mongoose =require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  timestamp: {
    type: Date,
    default: Date.now
  },
  content: {
    type: String,
    default: '',
    required: true
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: 'Post'
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

const Comment=mongoose.model('Comment',CommentSchema);
module.exports={Comment,CommentSchema};