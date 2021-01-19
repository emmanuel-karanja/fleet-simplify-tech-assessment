const userValidator=require('./user.validator');
const User=require('./user.model');


exports.getCount=async()=>{
    try{
     const count=await User.countDocuments();
     return count;
    }catch(error){
        throw error;
    }
}

exports.getAll=async(filter)=>{
    try {
        const users = await User.find();
        //we don't want to return passwords and what nots do we?
        const userProfiles=users.map(user=>user.toProfile());
        return userProfiles;
    }catch(error){
        console.log(error);
        throw error;
    }
}

exports.getUserById=async(userId)=>{
    try{
        const user=await User.findById(userId);
        if(!user)
            throw new Error(`User with id: ${userId} does not exist`);
        return user;
    }catch(error){
        console.log(error);
        throw error;
    }
}

exports.getUserByEmail=async(email)=>{
    try{
        const user=await User.findOne({email:email});
        if(!user)
            throw new Error(`User with email: ${email} does not exist`);
        return user;
    }catch(error){
        console.log(error);
        throw error;
    }
}

exports.create=async (newUserDTO)=>{     
    const{isValid, errors}=userValidator.validateNew(newUserDTO);
    if(!isValid)
       throw new Error(errors);
    const newUser = new User(newUserDTO);
    newUser.setPassword(newUserDTO.password);
    newUser.setLastLogin(new Date);
    try {
        const savedUser=await newUser.save();
        console.log(`New User with id: ${savedUser._id} successfully created`);
        return savedUser.authUser();
    }catch(error){
        console.log(error);
        throw error;
    }
}

exports.update=async (updatedUser)=>{  
    const{isValid, errors}=userValidator.validateUpdate(updatedUser);
    if(!isValid)
       throw new Error(errors);
    try{
        const savedUser=await User.findByIdAndUpdate(userId, userDTO);
        if(!savedUser)
          throw new Error('User could not be updated');
        console.log('User successfully updated');
        return savedUser.toProfileUser();
    }catch(error){
        console.log(error);
        throw error;
    }
}

exports.delete=async (currentUser,userId)=>{
    try{
        //a more useful way is to have a 'deleted' field and just set it to true
        //const deletedUser=await User.findByIdAndUpdae(userId,{deleted:true});
        if(currentUser._id !==userId)
               throw new Error(`A user cannot delete another user's account`);
        //else
        const user=await User.findById(userId);
        if(!user)
            throw new Error('Cannot Delete a user who does noy exist');
        await User.findByIdAndDelete(userId);
        console.log(`User with id: ${userId} successfully deleted`);
        return true;
    }catch(error){
        console.log(error);
        throw error;
    }
}

exports.follow=async(currentUser,userId)=>{
    try{
        const followed=await User.findById(userId);
        if(!followed) 
          throw new Error('User does not exist, you cannot follow a user who does not exist!');
        followed.setFollowed(currentUser._id);
        //get current user(follower), remember that only a subset of the
        //user entity is returned and use in the JWT.
        const follower=await User.findById(currentUser._id);
        follower.setFollowing(followed._id);
        follower.save();
        followed.save();
    }catch(error){
        console.log(error);
        throw error;
    }
}

exports.unFollow=async(currentUser,userId)=>{
    try{
        const followed=await User.findById(userId);
        if(!followed) 
          throw new Error('User does not exist, you cannot unfollow a user who does not exist!');
        followed.unSetFollowed(currentUser._id);
        //get current user(follower), remember that only a subset of the
        //user entity is returned and use in the JWT.
        const follower=await User.findById(currentUser._id);
        follower.unSetFollowing(followed._id);
        follower.save();
        followed.save();
        
    }catch(error){
     console.log(error);
     throw error;
    }
}

