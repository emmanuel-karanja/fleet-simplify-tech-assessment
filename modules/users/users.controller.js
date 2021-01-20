//each controller obtains the currentUser from the request object and performs authorization checks
//authorization will be done at the routes level, the controller simply unpacks the user
//and some of the params and performs the service call
//the purpose of the controller is so that the req,res objects don't polute the service layer
const userService=require('./user.service');

exports.getAll=async(req,res)=>{
  try{
    const users=await userService.getAll();
    const count=await userService.getCount();
    res.status(200).json({count:count,data:users});
  }catch(error){
    console.log(error);
    res.status(500).json({error:error});
  }
}
exports.getUserById=async (req,res)=>{
    const userId=req.params.id;
    try{
        const user = await userService.getUserById(userId);
        res.status(200).json({data:user});
    }catch(error){
        console.log(error);
      res.status(404).json(error);
    }
}



exports.myself=async (req,res)=>{
    const user=req.user;
    if(user)
       res.status(200).json(user);
    //else
       res.status(404).json({message:'No user is logged in'});
}

//creation is the same as registration and implies immediate logging in
//in a production environment this would only be the start of a process that involves
//validation via email or OTP etc
exports.create=async (req,res)=>{
  const newUserDto=req.body;
  try{
    const newUser=await userService.create(newUserDto);
    res.status(201).json({data:newUser});
  }catch(error){
    console.log(error);
    res.status(500).json(error);
  }

}

exports.delete=async (req,res)=>{
   const user=req.user;
   try{
     await userService.delete(user._id);
     res.status(200).json({message: `User with id ${user._id} successfully deleted`});
   }catch(error){
       console.log(error);
     res.status(500).json({error:error});
   }
}

exports.update=async (req,res)=>{
  const updatedUserDto=req.body;
  try{
    const updatedUser=await userService.update(updatedUserDto);
    res.status(200).json({data:updatedUser});
  }catch(error){
    console.log(error);
    res.status(500).json({error:error});
  }
}

exports.follow=async (req,res)=>{
  const loggedInUser=req.user;
  if(req.params.id === 'undefined'){
        res.status(422).json({error: 'No User Id parameters found'});
        return;
    }
  const userId=req.params.id;
  try{
    await userService.follow(loggedInUser,userId);
    res.status(200).json({message:'success'});
  }catch(error){
    console.log(error);
    res.status(500).json({error:error});
  }
}

exports.unFollow=async(req,res)=>{
  const loggedInUser=req.user;
  if(req.params.id ==='undefined'){
        res.status(422).json({error: 'No User Id parameters found'});
        return;
    }
  const userId=req.params.id;
  try{
    await userService.unFollow(loggedInUser,userId);
    res.status(200).json({message:'success'});
  }catch(error){
    console.log(error);
    res.status(500).json({error:error});
  }
}