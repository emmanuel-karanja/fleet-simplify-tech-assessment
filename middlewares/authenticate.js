const authService=require('../auth/auth.service')

exports.authenticate=async(req,res,next)=>{
    const currentUser=await authService.getUser(req);
    if(currentUser){
      req.user=currentUser;
      next();//move to the next middleware
    }else{
      throw new Error('Authentication failed');
    }
  }

 
