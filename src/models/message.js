const mongoose = require("mongoose");
const joi = require("joi");

const messageSchema = mongoose.Schema({
    message:{
        type:String,
        require:true
    },
//Referance 
    user:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"User"
    }
});

const messageModel = mongoose.model('Mesagge',messageSchema);

//Validation Schema
const Validationmsj = new joi.object({
    
    message:joi.string().min(3).max(100).required(),
    
});


module.exports={messageModel,Validationmsj};

