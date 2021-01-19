const{authenticate}=require('../middlewares/authenticate');
const userService=require('./user.service');

//yu can use app.Router object as well if preferred
module.exports=function(app){
    app.route('/users')
        .get(userService.list);
    app.route('/users/register') 
       .post(userService.create); 

    app.route('/users/:id')
        .get(userService.getUserById)
        .put(authenticate,userService.update)
        .delete(authenticate,userService.delete);
    app.route('/users/:id/follow')
        .post(authenticate,userService.follow);

    app.route('/users/:id/unfollow')
        .post(authenticate,userService.unFollow);
};