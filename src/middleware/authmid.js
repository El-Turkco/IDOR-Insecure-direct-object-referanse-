const jwt = require("jsonwebtoken");
const cookieParser = require('cookie-parser');


// Token validation Middleware
module.exports =function auth(req,res,next){    
    
//Get users jwt token value in cookie
    const Jwttoken = cookieParser.JSONCookies(req.headers?.cookie);
    
// Token value check 
    if (typeof Jwttoken  == null || typeof Jwttoken == "undefined"){
        return res.status(400).send({message:"Do you have account? "})
    }
// JwtToken params, get the token value
    const validToken = Jwttoken.split("=")[1];
//-----------------------------------------------  
//Check validToken 
    if(!validToken){
        return res.status(401).send("Unauthorized");
    }
// JwtToken validation
    try{
        const decodedToken = jwt.verify(validToken,process.env.JWT_KEY);
        req.user = decodedToken;
        
        if(!req.user._id == decodedToken._id  ){
            return res.status(404).send("İnvalid token value")
        }

        next();
    }

    catch(ex){
        return res.status(500).send("Not a Token")
    }
};
