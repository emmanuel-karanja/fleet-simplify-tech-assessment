20.01.2021 at 00:22hrs

 These are a few instructions:
 1. To run it remotely from the hosting:
    The app is hosted 'https://infinite-ravine-72089.herokuapp.com/' on Heroku.
    Navitage to The app URL is 'https://infinite-ravine-72089.herokuapp.com/ping' on Heroku to check if   
    the app is live, you should get the JSON 
    {
       "response":"pong"
    }

 2. To run the app in a local deployment:
      i.  clone and unzip the repo.
     ii. 'cd project' directory where you unzipped the repo.
    iii. 'npm install' to install the dependencies
     iv. 'npm start:dev' to start the application in development mode
          'npm start" to start the application in production mode

  **you need an active internet connection because the app connects to a remote mongodb cluster.

   

 3. The app uses JWT for authentication. The JWT is sent via na Authorization header prefixed 'Bearer '
    or 'Token ' (that space is required, so the thing will  be  like 'Token XXXXXX' where XXXXXX is
    the JWT token. Be sure to set that in your header before sending requests to CRUD posts and Comments.

 4. Navigate to 'http://localhost:3000/ping' or 'https://infinite-ravine-72089.herokuapp.com/ping' to check 
    if the server is responding.  It should return JSON:
   {
       response : 'pong'
   }

   **API ROOT will refer to either 'https://infinite-ravine-72089.herokuapp.com/' or 'http://localhost:3000'
     if you are running a local deployment
 5. Navigate to 'http://localhost:3000/users/register' to register a user. You must provide

   {
     "firstName":"user first name",
     "lastName" :"user last name",
     "email": "user email",
     "password": "user password",
     "confirmPassword":"user confirm password"
   }

   *password must be at least 7 characters long and any of the names must be at least 2 characters.
 6. You can then navigate to 'http://localhost:3000/login' to login.  A mini-profile of the user     
    will be returned along with the JWT.
    Logout has not been implemented
    yet and usually involves just setting the 'Token XXXX' XXXX to ''. Due to the limited scope of
    the demo, the JWT has been given a long expiry which is not good for production, and 'refresh-token'
    endpoint has not been supplied. The JWT is generated on login and also on successful registration

 7. The following are the rest of the API end-points:

     POST '/login' -->logs in a user given email and password credentials, returns a mini-profile of            
                     the user along with the JWT.

      GET '/users/:id' -->fetches a user given an id ':id'
      PUT '/users/:id' -->updates a user given an id and requires the request body to contain the update
                          data
      DELETE '/users/:id'--->deletes a user given an id.
      GET '/users' -->fetches all users.
      GET '/users/me'-->fetches the current logged in user.
 
      POST '/users/:id/follow' to follow a user with id 'userId'.
      POST '/users/:id/unfollow' to unfollow a user with id 'userId'.

      

  ** a user cannot follow or unfollow himself.
      POST '/posts' -->creates a post with the post data being in the request body i.e. title and content
      GET '/posts'  -->returns all posts
      GET '/posts/id:-->returns post with id ':id'
      PUT '/posts/:id' --->updates post with id, and updated post data is in the request body
      DELETE '/posts/:id' -->deletes a post with id.

      POST '/posts/:id/like' to like post with id 'postId'
      POST '/posts/:id/unlike' to unlike post with id 'postId'
   
      GET '/posts/:postId/comments' fetches all comments for post with id 'postId'
      POST '/posts/:postId/comments creates a new comment for post with id 'postId'
      GET '/posts/:postId/comments/:commentId' fetches comment for post with id 'postId' and
            comment with id 'commentId'
      PUT '/posts/:postId/comments/:commentId' updates comment with id 'commentId' for post with id 'postId'
      DELETE '/posts/:postId/comments/:commentId deletes comment with id 'commentId' for post
            with id 'postId'.


 8. To create a comment, all you need to specify is the content i.e.
    {
      "content":"content goes here"
    }

 9. To create a post, all you need to specify the title and the content:
    {
      "title":"post title",
      "content":"content goes here"
     }

  **title must be at least 5 characters long and content must be at least 20 characters long
      