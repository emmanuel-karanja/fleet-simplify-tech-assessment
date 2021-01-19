const {authenticate}=require('../middlewares/authenticate');
const commentService=require('./comments.service');

module.exports=function(app){
    app.route('/posts/:postId/comments')
        .get(authenticate,commentService.getAll)
        .post(authenticate,commentService.create);

    app.route('/posts/:postId/comments/:id')
        .get(authenticate,commentService.getCommentById)
        .put(authenticate,commentService.update)
        .delete(authenticate,commentService.delete);
};