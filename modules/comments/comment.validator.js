const Joi=require('@hapi/joi');

function validateUpdate(comment){
    const result=Joi.validate(comment,editCommentSchema,{ abortEarly: false });
    const{error}=result;
    const isValid= error==null;
    return{
        isValid,errors:error
    }
}

function validateNew(newComment){
    const result=Joi.validate(newComment,createCommentSchema,{ abortEarly: false });
    const{error}=result;
    const isValid= error==null;
    return{
        isValid,errors:error
    }
}

//why do it like this? So that if we add more fields to the comment entity, all we'll need
//to do is add more validation schema fields and not have to mess up the services
const commentContentSchema=Joi.string().min(10);


const createCommentSchema=Joi.object().keys({
    content: commentContentSchema.required(),
});

const editCommentSchema=Joi.object().keys({
    content: commentContentSchema.required(),
});



module.exports={
   validateUpdate,validateNew
}


