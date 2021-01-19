const mongoose =require('mongoose');
const Schema = mongoose.Schema;
const CommentSchema='./comments';
const PostSchema = new Schema({
  timestamp: {
    type: Date,
    default: Date.now
  },
  title: {
    type: String,
    default: '',
    trim: true,
    required: true
  },
  content: {
    type: String,
    default: '',
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt:{
    type:Date,
    default: new Date,
  },
  modifiedAt:{
    type:Date,
    default: new Date
  },
  //this is a one-to-many relationship with posts having full ownership of comment
   comments: [CommentSchema],
   likes:[{type: Schema.Types.ObjectId,  ref: 'User'}],
});

PostSchema.methods.like=function(user){
    this.likes.push(user);
}

PostSchema.methods.unlike=function(user){
   this.likes.remove(user);
}


const Post=mongoose.model('Post',PostSchema);
module.exports=Post;