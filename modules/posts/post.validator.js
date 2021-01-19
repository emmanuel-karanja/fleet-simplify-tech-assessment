const Joi=require('@hapi/joi');

function validateUpdate(post){
    //implement the update validation
    const result=Joi.validate(post,editPosttSchema,{ abortEarly: false });
    const{error}=result;
    const isValid= error==null;
    return{
        isValid,errors:error
    }
    
}

function validateNew(newPost){
    //validate task for creation
    const result=Joi.validate(newPost,createPosttSchema,{ abortEarly: false });
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
