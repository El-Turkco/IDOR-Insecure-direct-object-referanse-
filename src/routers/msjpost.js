const express = require("express");
const router = express.Router();
const {message_create,get_message,delete_message} = require("../Controller/MsjController");
const authMid  = require("../middleware/authmid");


// Create Message Post request in here
router.post("/message",authMid,message_create);

// Get Messages GET request in here
router.get("/messages",authMid,get_message);

// Delete Message delete request in here
router.delete("/delete/messages/:id",authMid,delete_message);

module.exports=router;