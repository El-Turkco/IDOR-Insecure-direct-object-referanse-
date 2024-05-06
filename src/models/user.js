const mongoose = require("mongoose");
const joi = require("joi");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
    name:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
        require:true,
    },
   
},{
// Jwt Token generate methods for users
    methods:{
        createAuthToken(){
            return jwt.sign({_id:this._id,name:this.name},process.env.JWT_KEY);
        }
    }

},{timestamps:true});

//Validation Schema
const validationMessage = new joi.object({
    message:joi.string().min(3).max(100).required(),
    
});

//Validation Schema
const validationUser = new joi.object({
    name:joi.string().min(3).max(10).required(),
    password:joi.string().min(10).max(100).required(),
});

//Validation Schema
const validationAuth = new joi.object({
    name:joi.string().min(3).max(10).required(),
    password:joi.string().min(10).max(100).required(),
});


const User = mongoose.model('User',userSchema);


module.exports={User,validationUser,validationAuth,validationMessage};

