const authService=require('./auth.service');

module.exports=function(app){
	app.use('/login')
	   .post(authService.getUser);
}