const {authenticate}=require('../../middlewares/authenticate');
const userController=require('./users.controller');

//yu can use app.Router object as well if preferred
module.exports=function(app){
    app.route('/users')
        .get(userController.getAll);
     app.route('/users/me')
        .get(authenticate,userController.myself);

    app.route('/users/register') 
       .post(userController.create); 

    app.route('/users/:id')
        .get(authenticate,userController.getUserById)
        .put(authenticate,userController.update)
        .delete(authenticate,userController.delete);
    app.route('/users/:id/follow')
        .post(authenticate,userController.follow);

    app.route('/users/:id/unfollow')
        .post(authenticate,userController.unFollow);
};