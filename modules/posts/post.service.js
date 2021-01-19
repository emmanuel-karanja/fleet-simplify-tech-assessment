const postValidator=require('./post.validator');
const Post=require('./post.model');

exports.getCount=async(currentUser)=>{
    //returns count
    try{
        const count=await Post.countDocuments({author:currentUser._id});
        return count;
    }catch(error){
        throw error;
    }
}

exports.getAll=async(currentUser)=>{
     try{
         const posts=await Post.find({author: currentUser._id})
                                     .sort({id:-1})
                                     .populate('author', 'firstName lastName email')
                                     .populate('comments', '_id createdAt content')
                                     .exec();
         return posts;
     }catch(error){
         console.log(error);
         throw error;
     }
}

exports.getPostById=async(currentUser,postId)=>{
    try{
        const post=await Post.findById(postId)
                                   .populate('author', 'firstName lastName email')
                                   .populate('comments', '_id createdAt content')
                                   .exec();
        if(!post)
            throw new Error(`Post with id: ${postId} not found!`);
        return post;
    }catch(error){
        console.log(error);
        throw error;
    }
}

exports.create=async (currentUser,postDTO)=>{   
    //if(postDTO === 'undefined')
     const {isValid, errors}=postValidator.validateNew(postDTO);
    if(!isValid)
        throw new Error(errors);
    const newPost=new Post(postDTO);
    try{
        newPost.author=currentUser._id;
        newPost.createdAt=new Date;
        const savedPost=await newPost.save();
        console.log('Post successfully created');
        //emit events here e.g. eventService.emit('post_created', project.toProfileProject());
        return savedPost;
    }catch(error){
        console.log(error);
        throw error;
    }
}

exports.update=async (currentUser,postId,updatedPosttDTO)=>{  

    const {isValid, errors}=postValidator.validateUpdate(updatedPosttDTO); 
    if(!isValid)
       throw new Error(errors);
    try{
    	let post=await Post.findById(postId);
    	if(currentUser._id!==post.author)
            throw new Error('A Post can only be updated by the creator')
      updatedPostDTO.modifiedAt=new Date;
      const savedPost=await Post.findByIdAndUpdate(postId,updatedPosttDTO);
      console.log('Post successfully updated');
  
      return savedPost;
    }catch(error){
        console.log(error);
        throw error;
    }
}

exports.delete=async(currentUser,postId)=>{
    try{
    	const postExists=await Post.findById(postId);
        if(!postExists)
            throw new Error('Cannot Delete a Post that does not exist');
        if(currentUser._id!==postExists.author)
            throw new Error('A Post can only be updated by the creator')
       await Post.findByIdDelete(postId);
        console.log(`Post with id: ${postId} successfully deleted`);
       return true;
    }catch(error){
        console.log(error);
        throw error;
    }
}

exports.like=async(currentUser,postId)=>{
	const userId=currentUser._id;
	try{
		let post=await Post.findById(postId);
		post.like(userId);
	}catch(error){
        console.log(error);
        throw error;
    }
}


exports.unLike=async(currentUser,postId)=>{
	const userId=currentUser._id;
	try{
		let post=await Post.findById(postId);
		post.unLike(userId);
	}catch(error){
        console.log(error);
        throw error;
    }
}








