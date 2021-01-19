const Joi=require('joi');

const emailSchema=Joi.string().email().lowercase();
const passwordSchema=Joi.string().min(7).alphanum();

function validateCredentials(creds){
    const result=loginSchema.validate(creds,{ abortEarly: false });
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