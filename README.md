# IDOR-Insecure-direct-object-referanse-
IDOR vulnerability simulation with nodeJs 


Insecure Direct Object References (IDOR) vulnerability is a web application vulnerability that allows an attacker to gain unauthorized access and perform actions on a target web application.

For example, a user shared an image or a post without his or her authorization. If you can delete it, this is an Insucere direct object reference, in short, you will be exploiting the IDOR vulnerability.

In my own project, I designed a web application that contains this vulnerability.


Application architecture

https://github.com/El-Turkco/IDOR-Insecure-direct-object-referanse-/assets/103064152/2eb0700a-3202-4c96-be52-8b0070d91a40



Steps to produce IDOR
1- Open two different accounts (1-Account:hacker, 2-Account:TestUser)
2- Share a message from the test account and get the message ID 
3- Go to delete messages from the hacker account and provide the messageID of the test account and send the request.


This is to turn off the security patch: The userID of the user logged in with messageID should be checked in the deletion process. 

I shared this patch in line 76 of the “delete_message” function in src/Controller/MsjController.js. You can take a look there if you wish. 
