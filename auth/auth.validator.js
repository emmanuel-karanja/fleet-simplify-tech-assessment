const Joi=require('@hapi/joi');

const emailSchema=Joi.string().email().lowercase();
const passwordSchema=Joi.string().min(7).alphanum();

function validateCredentials(creds){
    const result=Joi.validate(creds,loginSchema,{ abortEarly: false });
    const{error}=result;
    const isValid= error==null;
    return{
        isValid,errors:error
    }
}

const loginSchema=Joi.object().keys({
    email: emailSchema.required(),
    password: passwordSchema.required().strict(),
});

module.exports={
	validateCredentials
}