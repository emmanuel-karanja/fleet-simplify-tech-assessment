const config=require('../config');
const jwt = require('jsonwebtoken');
const userService=require('../modules/users/user.service');
const authValidator=require('./auth.validator');

//a hack to deal with the .env heroku issues
const jwtSecret = 'tetsugaatsuinitsureteutsu';
//const jwtSecret=config.jwtSecret;

const getTokenFromHeader=(req)=>{
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token' ||
        req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      return req.headers.authorization.split(' ')[1];
    } 
    return null;
  }

exports.getUser=async(req)=> {
  const token = getTokenFromHeader(req);
  if (!token) return null;
  try {
    //obtain the user id from the token and use it to obtain user from the db
    //here,JWT signing uses email and user id.
    //you can use the email too if you wish
    const {id} = jwt.verify(token, jwtSecret);
    const user=await userService.getUserById(id);
    if(!user)
       throw new Error('Authentication failed, user not found!');
    return user.toProfile();
  } catch (error) {
    console.log(error);
    return null;
  }
}

exports.login=async(credsDto)=>{
   const{isValid, errors}=authValidator.validateCredentials(credsDto);
    if(!isValid)
       throw new Error(errors);

    //extract email and password from Dto
     const {email,password}=credsDto;

     try{
        const user=await userService.getUserByEmail(email);
         if(!user)
           throw new Error('Authentication failed! User not found!');
          //else    
          if(user.authenticate(password)){
             user.setLastLogin(new Date);
             user.save();
              //the JWT generation is handled automatically by the user document
             const userProfile=user.authUser();
             console.log(userProfile)
             return userProfile
             }else{
                  throw new Error('Authentication failed, password incorrect!');
             }
           }catch(error){
               console.log(error);
               throw error;
            }
}

