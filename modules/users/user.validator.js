const Joi=require('joi');

function validateUpdate(user){
    const result=editUserSchema.validate(user,{ abortEarly: false });
    const{error}=result;
    const isValid= error==null;
    return{
        isValid,errors:error
    }
}

function validateNew(newUser){
    const result=createUserSchema.validate(newUser,{ abortEarly: false });
    const{error}=result;
    const isValid= error==null;
    return{
        isValid,errors:error
    }
}

const emailSchema=Joi.string().email().lowercase();
const nameSchema=Joi.string().min(2).max(100);
const passwordSchema=Joi.string().min(7).alphanum();

const createUserSchema=Joi.object().keys({
    email: emailSchema.required(),
    firstName: nameSchema.required(),
    lastName: nameSchema.required(),
    password: passwordSchema.required().strict(),
    confirmPassword: passwordSchema.valid(Joi.ref('password')).required().strict(),
    image: Joi.string().optional(),
});

const editUserSchema=Joi.object().keys({
    email: emailSchema.required(),
    firstName: nameSchema.required(),
    lastName: nameSchema.required(),
    password: passwordSchema.required().strict(),
    image: Joi.string().optional(),
});

const changePasswordUserSchema=Joi.object().keys({
    email: emailSchema.required(),
    createdOn: Joi.date().iso().required(),
    password: passwordSchema.required().strict(),
    confirmPassword: passwordSchema.valid(Joi.ref('password')).required().strict()

});

module.exports={
    validateUpdate,
    validateNew
}