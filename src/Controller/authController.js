const bcrypt = require("bcrypt");
const {User,validationUser,validationAuth} = require("../models/user");
require("dotenv").config();
const jwttoken = require("../middleware/tokenvalue");

//Create User request 
exports.create_user= async function(req,res){
  //Validation check
  const result = validationUser.validate(req.body);

  if (result.error){
      return res.status(500).send(result.error.message);
  }
  // Checking the username to database
  let user = await User.findOne({
      name:req.body.name,
  });

  if(user){
      return res.status(400).send({name:req.body.name,message:"This user is already registered"});
  }

  try{
      //Password Hashed 
      const hashedPass = await bcrypt.hash(req.body.password,10);

      const user = new User({
          name: req.body.name,
          password:hashedPass
      });


      await user.save();
      
      return res.status(201).send({name:req.body.name,succes:"successful",});
      
  }

  catch(err){
      console.log(err)
      return res.status(500).send("Someting went wrong");
  }


};

// Login User request
exports.auth_user = async function(req,res){

     //Validation check
     const result = validationAuth.validate(req.body);
     if (result.error){
         return res.status(500).send(result.error.message);
     }
 
   try {
       const userCheck = await User.findOne({
           name:req.body.name,
       });

       //user Check 
       if (!userCheck){
           return res.status(400).send("Not user registration");
       }

       //Password Check 
       const match = await bcrypt.compare(req.body.password,userCheck.password);
       
       if(!match){
           return res.status(400).send("İnvalid name or password");
       }

       const token = userCheck.createAuthToken();

       res.cookie("jsonwebtoken",token,{
           expires: new Date(new Date().getTime()+5*60*1000
           ),
           secure:true
       });


       return res.status(200).header("Acces-Token",token).send(
       {
           name:req.body.name,
           token:token,
           succes:true
       });  
       
   }

   catch(err){
       res.status(500).send("Someting went wrong")
       console.log(err)
   }

};

// Get User profil request 
exports.get_profil = async function(req,res){
   
//Get user ID from cookie
    const Jwttoken = jwttoken(req.headers?.cookie);

    return res.send({sussces:true,user:Jwttoken.name,userID:Jwttoken._id});
};