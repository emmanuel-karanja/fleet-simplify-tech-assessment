//export the routes, a bit of a hack but will have to do for now
module.exports=(app)=>{
  require('../auth/auth.routes')(app);
  require('./users/users.routes')(app);
  require('./posts/posts.routes')(app);
  require('./comments/comments.routes')(app);
}