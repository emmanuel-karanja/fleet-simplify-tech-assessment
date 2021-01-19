const {authenticate}=require('../../middlewares/authenticate');
const commentController=require('./comments.controller');

module.exports=function(app){
    app.route('/posts/:postId/comments')
        .get(authenticate,commentController.getAll)
        .post(authenticate,commentController.create);

    app.route('/posts/:postId/comments/:id')
        .get(authenticate,commentController.getCommentById)
        .put(authenticate,commentController.update)
        .delete(authenticate,commentController.delete);
};