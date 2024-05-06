const express = require("express");
const router = express.Router();
const authMid  = require("../middleware/authmid");
const{create_user,auth_user,get_profil} = require("../Controller/authController");

//User createtion here 
router.post('/create',create_user)

//User login here 
router.post('/auth',auth_user)

// Get the profil  
router.get("/profil",authMid,get_profil)

module.exports = router;