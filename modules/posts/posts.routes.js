const {authenticate} =require('../middlewares/authenticate');
const postService=require('./posts.service');

module.exports=function(app){
    app.route('/posts')
        .get(,authenticate,postService.getAll)
        .post(authenticate,postService.create);

    app.route('/posts/:id')
        .get(authenticate,postService.getPostById)
        .put(authenticate,postService.update)
        .delete(authenticate,postService.delete);
    app.route('/posts/:id/like')
        .post(autheticate,postService.like);
    app.route('/posts/:id/unlike')
        .post(autheticate,postService.unLike);
};
