const cookieParser = require('cookie-parser');
const jwt = require("jsonwebtoken");


// Get the Jwt token value in the cookie Middleware 
module.exports = function jwttoken(value){

    const token = cookieParser.JSONCookies(value);

    const validtoken = token.split("=")[1];

    const decodedToken = jwt.verify(validtoken,process.env.JWT_KEY);

    return decodedToken;

};