
const  commentService=require('./comments.service');

exports.getAll=async (req,res)=>{
    if(req.params.postId ==='undefined'){
        res.status(422).json({error: 'No Post Id parameters found'});
        return;
    }
    
   const loggedInUser=req.user;
   const postId=req.params.postId;
    try{
        const comments=await commentService.getAll(loggedInUser,postId);
        const count=await commentService.getCommentCount(loggedInUser,postId);
        res.status(200).json({data:comments});
    }catch(error){
        console.log(error);
        res.status(500).json({error:error});
    }

}


exports.create=async (req,res)=>{
    if(req.params.postId==='undefined'){
        res.status(422).json({error: 'No Post Id parameters found'});
        return;
    }
   const newCommentDto=req.body;
   const loggedInUser=req.user;
   const postId=req.params.postId;
   try{
       const newComment=await commentService.create(loggedInUser,postId,newCommentDto);
       console.log('Project successfully created');
       res.status(201).json({data:newComment});
   }catch(error){
       console.log(error);
       res.status(500).json({error:error});
   }


}
exports.update=async (req,res)=>{
    if(req.params.id === 'undefined' || req.params.postId==='undefined'){
        res.status(422).json({error: 'No Post Id parameters found'});
        return;
    }
    const postId=req.params.postId;
    const commentId=req.params.id;
    const updatedCommentDTO=req.body;
    const loggedInUser=req.user;
  
    try{
      const updatedComment=await commentService.update(loggedInUser,postId,commentId,updatedCommentDTO);
      res.status(200).json({data:updatedComment});
    }catch(error){
        console.log(error);
        res.status(500).json({error:error});
    }

}

exports.delete=async (req,res)=>{
    if(req.params.id === 'undefined' || req.params.postId ==='undefined'){
        res.status(422).json({error: 'No PostId parameter found'});
        return;
    }
    const postId=req.params.postId;
    const commentId=req.params.id;
    const loggedInUser=req.user;
    try{
       let comment= await commentService.delete(loggedInUser,postId,commentId);
       return res.status(200).json({message:'success'})
    }catch(error){
        console.log(error);
        res.status(500).json({error:error});
    }

};


exports.getCommentById=async (req,res)=>{
    if(req.params.id === 'undefined'){
        res.status(422).json({error: 'No Post Id parameter found'});
        return;
    }
    const postId=req.params.postId;
    const commentId=req.params.id;
    const loggedInUser=req.user;
    try{
        const comment=await commentService.getCommentById(loggedInUser,postId,commentId)

        res.status(200).json({data:comment});
    }catch(error){
        console.log(error);
        res.status(500).json({error:error});
    }
}

