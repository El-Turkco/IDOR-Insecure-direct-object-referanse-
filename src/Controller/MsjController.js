const cookieParser = require('cookie-parser');
const jwt = require("jsonwebtoken");
const {validationMessage} = require("../models/user");
const jwttoken = require("../middleware/tokenvalue");
const{messageModel} = require("../models/message");


//Message create request
exports.message_create = async function (req,res){
// Middleware for Jwt token value
const validToken= jwttoken(req.headers?.cookie);

try{

  const msj = new messageModel({
    message:req.body.message,
    user:validToken._id,
  })

  await msj.save({
    message:req.body.message,
    user:validToken._id
  });


}
catch(err){
  console.log(err)
  return res.status(500).send({message:"Someting went wrong"});
}

  //Validation check
  const result = validationMessage.validate(req.body);
  if(result.error){
    return res.status(500).send(result.error.message);
  }
  
try{
   return res.status(201).send({sussces:true,user:validToken.name})
}

catch(err){
    return res.status(500).send("Someting went wrong");
}

};

// Get the message request
exports.get_message = async function(req,res){

  const validToken= jwttoken(req.headers?.cookie);

  const Usermsj = await messageModel.find({
    user:validToken._id,
  });

  return res.status(200).send({messages:Usermsj})

};


//Message deleteion request
exports.delete_message = async function(req,res){

if(!req.method== 'DELETE'){
    return res.status(400).send("unaccepted request");
}
try{
//Get the logged in user ID
  const JwtToken= jwttoken(req.headers?.cookie);
// Get the user ID of the requesting message
  const messageuser= await messageModel.findOne({_id:req.params.id});
// convert object id to string
  const msjUserID= await messageuser.user.toString();

  //**SECURİTY PATCH***//
  //***//İmportant note
  //Comparing the user ID of the message in the request with the logged in user ID.In this way, closing the IDOR vulnerability
  //* if(JwtToken._id !== msjUserID){  
  //*   return res.status(403).send({message:"Forbiden"})
  //* }
  
  // Message İD check in the  database
  const idCheck = await messageModel.findOne({
      _id:req.params.id
  });

  if(!idCheck){
    return res.status(400).send(
      {message:"Not found message"});
  }

  //Message delete
  await messageModel.deleteOne({
    _id:req.params.id
  })

  return res.status(200).send({message:"Message deletion successful"})

}

catch(ex){
  return res.status(500).send("Someting went wrong");
}};


