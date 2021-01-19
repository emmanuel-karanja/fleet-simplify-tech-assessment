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

const mongooseValidationErrorTransform = require('mongoose-validation-error-transform');
 
mongoose.plugin(mongooseValidationErrorTransform, {
  capitalize: true,
  humanize: true,
 
  transform: function(messages) {
    return messages.join(', ');
  }
 
});
const Comment=mongoose.model('Comment',CommentSchema);
module.exports={Comment,CommentSchema};