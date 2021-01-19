
const  postService=require('../modules/posts/post.service');

exports.getAll=async (req,res)=>{
   const loggedInUser=req.user;
    try{
        const posts=await postService.getAll(loggedInUser);
        res.status(200).json({data:posts});
    }catch(error){
        console.log(error);
        res.status(500).json({error:error});
    }

}


exports.create=async (req,res)=>{
   const newPostDto=req.body;
   const loggedInUser=req.user;
   try{
       const post=await postService.create(loggedInUser,newPostDto);
       res.status(201).json({data:post});
   }catch(error){
       console.log(error);
       res.status(500).json({error:error});
   }


}
exports.update=async (req,res)=>{
    if(req.params.id === 'undefined'){
        res.status(422).json({error: 'No Post Id parameter found'});
        return;
    }
    const postId=req.params.id;
    const updatedPostDTO=req.body;
    const loggedInUser=req.user;

    try{
      const updatedPost=await postService.update(loggedInUser,postId,updatedPostDTO);
      res.status(200).json({data:updatedPost});
    }catch(error){
        console.log(error);
        res.status(500).json({error:error});
    }

}

exports.delete=async (req,res)=>{
    if(req.params.id === 'undefined'){
        res.status(422).json({error: 'No PostId parameter found'});
        return;
    }
    const postId=req.params.id;
    const loggedInUser=req.user;
    try{
       let postt= await postService.delete(loggedInUser,postId);
       return res.status(200).json({message:'success'})
    }catch(error){
        console.log(error);
        res.status(500).json({error:error});
    }

};


exports.getPostById=async (req,res)=>{
    if(req.params.id === 'undefined'){
        res.status(422).json({error: 'No Post Id parameter found'});
        return;
    }
    const postId=req.params.id;
    const loggedInUser=req.user;
    try{
        const post=await postService.getPostById(loggedInUser,postId)

        res.status(200).json({data:post});
    }catch(error){
        console.log(error);
        res.status(500).json({error:error});
    }
}

exports.like=async(req,res)=>{
	if(req.params.id === 'undefined'){
        res.status(422).json({error: 'No Id parameter found'});
        return;
    }
    const postId=req.params.id;
    const loggedInUser=req.user;
    try{
        const post=await postService.like(loggedInUser,postId)

        res.status(200).json({message:'success'});
    }catch(error){
        console.log(error);
        res.status(500).json({error:error});
    }
}

exports.unLike=async(req,res)=>{
	if(req.params.id === 'undefined'){
        res.status(422).json({message: 'No Id parameter found'});
        return;
    }
    const postId=req.params.id;
    const loggedInUser=req.user;
    try{
        const post=await postService.unLike(loggedInUser,postId)
        res.status(200).json({message:'success'});
    }catch(error){
        console.log(error);
        res.status(500).json({error:error});
    }
}