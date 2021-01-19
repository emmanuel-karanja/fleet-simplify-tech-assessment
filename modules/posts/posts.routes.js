const {authenticate} =require('../../middlewares/authenticate');
const postController=require('./posts.controller');

module.exports=function(app){
    app.route('/posts')
        .get(authenticate,postController.getAll)
        .post(authenticate,postController.create);

    app.route('/posts/:id')
        .get(authenticate,postController.getPostById)
        .put(authenticate,postController.update)
        .delete(authenticate,postController.delete);
    app.route('/posts/:id/like')
        .post(authenticate,postController.like);
    app.route('/posts/:id/unlike')
        .post(authenticate,postController.unLike);
};
