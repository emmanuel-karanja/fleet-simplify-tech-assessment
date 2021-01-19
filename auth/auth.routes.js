
const authController=require('./auth.controller');

module.exports=function(app){
	app.route('/login')
	   .post(authController.login);
}