const commentValidator=require('./comment.validator');
const {Comment}=require('./comment.model');
const Post=require('../posts/post.model');
const userService=require('../users/user.service');

exports.getCommentCount=async(currentUser,postId)=>{
    //this is a little bit more involved, 
    try{
        const post=await Post.findById(postId);
        if(!post)
          throw new Error(`Post with id: ${postId} not found`);
        return post.comments.length;
    }catch(error){
        console.log(error);
        throw error;
    }
}

exports.getAll=async(currentUser,postId)=>{
    //implement paging later
    try{
        const post=await Post.findById(postId)
                             .populate('comments','_id content createdAt author')
                             .exec();
        if(!post)
            throw new Error(`Post with id: ${postId} could not be found`);
        const comments=post.comments;
        return comments;
    }catch(error){
        console.log(error);
        throw error;
    }
}

exports.getCommentById=async(postId,commentId)=>{
    try{
      const post=await Post.findById(postId);
      if(!post) 
         throw new Error(`Post with id: ${postId} not found`);
      const comment=post.comments.id(commentId);
       if(!comment)
          throw new Error(`Comment with id: ${commentId} not found`);
     return comment;
    }catch(error){
        console.log(error);
        throw error;
    }
}


exports.update=async (currentUser,postId,commentId,updatedComment)=>{
    //validate
    const{errors, isValid}=commentValidator.validateUpdate(updatedComment);
    if(!isValid)
         throw new Error(errors);
   try {
       const post = await Post.findById(postId);
       let comment=project.comments.id(commentId);
       comment.set(updatedComment);
       comment.modifiedAt=new Date;
       post.modifiedAt = new Date;
       post.save();
       console.log(`Comment with id: ${commentId} successfully updated`);
       return comment;
   } catch (error) {
       console.log(error);
       throw error;
   }
}

exports.create=async(currentUser,postId,newCommentDTO)=>{   
   
    const userId=currentUser._id;
   const{errors, isValid}=commentValidator.validateNew(newCommentDTO);
   if(!isValid)
         throw new Error(errors);
         
    const newComment = new Comment(newCommentDTO);
    try {
        const post = await Post.findById(postId);
        if(!post) 
            throw new Error(`Post with id: ${postId} could not be found`);
        newComment.author=userId;
        newComment.createdAt = new Date;
      
        post.comments.push(newComment);
        post.modifiedAt=new Date;
        post.save();
        console.log(`Comment ${newComment.content} successfully added to project`);
        return newComment;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

exports.delete=async (currentUser,postId,commentId)=>{
    const userId=currentUser._id;
    try {
        const post = await Post.findById(postId);
        if(!post) 
           return false; //delete failed
        //else
        //get the comment
        const comment=post.comments.id(commentId);
        if(userId!==comment.author)
            throw new Error('A Comment can only be deleted by the creator')
        comment.remove();
        post.modifiedAt=new Date;
      
        post.save();
        console.log(`Comment with id: ${commentId} successfully deleted`);
        return true;
    } catch (error) {
        console.log(error);
        throw error;
    }

}

