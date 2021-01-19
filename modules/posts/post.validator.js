const Joi=require('joi');

function validateUpdate(post){
    //implement the update validation
    const result=editPostSchema.validate(post,{ abortEarly: false });
    const{error}=result;
    const isValid= error==null;
    return{
        isValid,errors:error
    }
    
}

function validateNew(newPost){
    //validate task for creation
    const result=createPostSchema.validate(newPost,{ abortEarly: false });
    const{error}=result;
    const isValid= error==null;
    return{
        isValid,errors:error
    }
}

const createPostSchema=Joi.object().keys({
    title: Joi.string().min(5).required(),
    content: Joi.string().min(20).required(),
});

const editPostSchema=Joi.object().keys({
    title: Joi.string().min(5).required(),
    content: Joi.string().min(20).required(),
});

module.exports={
   validateUpdate,validateNew,
}
