const authService=require('./auth.service');

exports.login=async(req,res)=>{
	const credentials=req.body;
	try{
     const user=await authService.login(credentials);
     res.status(200).json(user);
	}catch(error){
		console.log(error);
	    res.status(500).json({error:error});
	}
}