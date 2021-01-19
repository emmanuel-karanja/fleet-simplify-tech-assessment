const config=require('../../config');
const mongoose=require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt=require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const jwtSecret=config.jwtSecret;

const UserSchema = new mongoose.Schema({
    firstName: {type:String,trim:true,required: [true, "can't be blank"],lowercase:true},
    lastName:{type: String,trim: true,required: [true, "can't be blank"],lowercase:true},
    image: {type:String,default:'https://static.productionready.io/images/smiley-cyrus.jpg'},
    email: {type: String, unique:true, index:true,required: [true, "can't be blank"],
             match: [/\S+@\S+\.\S+/, 'is invalid'],lowercase:true},
    password: { type: String, required: true},
    salt:String,
    createdAt: { type: Date, default: Date.now},
    modifiedAt:{type: Date,},
    //self-referentials
    followed:[this],
    following:[this],
    lastLogin:{type:Date,}
});

UserSchema.plugin(uniqueValidator, {message: 'is already taken.'});

UserSchema.statics.getUserByEmail=function(email,callback){
    this.findOne({email:new RegExp(email,'i')},callback)
}

UserSchema.pre('save',function(next){
    this.modifiedAt=new Date();
    next();
});


UserSchema.virtual('fullName').get(function(){
    return this.firstName +' '+ this.lastName;
}).set(function(fullName){
    let splitName=fullName.split(' ');
    this.firstName=splitName[0] || '';
    this.lastName=splitName[1] || '';
});


UserSchema.methods.setPassword=function(password){
    if(this.password){
        const saltRounds=12;
        this.salt = bcrypt.genSaltSync(saltRounds);
        this.password = this.hashPassword(this.password);
    }
}

UserSchema.methods.hashPassword=function(password){
    return bcrypt.hashSync(password,this.salt);
}

UserSchema.methods.setLastLogin=function(date){
    this.lastLogin=date;
}

UserSchema.methods.authenticate=function(password){
    return this.password ===this.hashPassword(password);
};

//this should be in the user.service but it's okay here as well for the demo
UserSchema.methods.generateJWT = function() {
    const today = new Date();
    const expiry = new Date(today);
    //the expiry should be a matter of hours not days!!
    expiry.setDate(today.getDate() + 60);

    return jwt.sign({
        id: this._id,
        fullName: this.fullName,
        email:this.email,
        expiry: parseInt((expiry.getTime()) / 1000),
    }, jwtSecret);
};

UserSchema.methods.authUser =function(){
    return {
        _id:this._id,
        fullName:this.fullName,
        email: this.email,
        image: this.image || 'https://static.productionready.io/images/smiley-cyrus.jpg',
        token: this.generateJWT(),
    };
};

UserSchema.methods.toProfile=function(){
    return{
        _id: this._id,
        fullName: this.fullName,
        email: this.email,
        image: this.image || 'https://static.productionready.io/images/smiley-cyrus.jpg',
        active: this.active,
    }
}

UserSchema.methods.setFollowed=function(userId){
        this.followed.push(userId);
}

UserSchema.methods.unSetFollowed=function(userId){
        this.followed.remove(userId);
}

UserSchema.methods.setFollowing=function(userId){
       this.following.push(userId);
}

UserSchema.methods.unSetFollowing=function(userId){
       this.following.remove(userId);
}


const User=mongoose.model('User',UserSchema);
module.exports=User;