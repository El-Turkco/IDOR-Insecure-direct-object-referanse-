// requirements 
require("dotenv").config();
const express = require("express");
const Authrouter = require("../src/routers/auth");
const Messagerouter =require("../src/routers/msjpost");
const bodyParser = require('body-parser');

// constants
const PORT = process.env.PORT || 8080;

// main express program
const app = express();

//Configurations
app.use(express.json());

app.use(bodyParser.urlencoded({extended:true}));

//Routers
app.use("/api/v1/users",Authrouter);
app.use("/api/v1/users",Messagerouter);


// Main
app.use("/",function(req,res){
    return res.status(200).send("Hi,Are you logged in ");
});

//Server listenig 
app.listen(PORT,err => {
    if ( err){
        console.log(err);
        process.exit(1);
    }
    console.log('Server is listenig on port '.concat(PORT));
});

//Ctrl+c to come to action 
process.on('SIGINT',function(){
    process.exit();
});