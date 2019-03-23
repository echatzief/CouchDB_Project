//Retrieve the private key
var privateKey = require('./config.js').key
var jwt = require('jsonwebtoken');

//Authentication middleware function
var authMiddle=function(req,res,next){

    //Trying to verify if the token is valid
    jwt.verify(req.body.token,privateKey,(err,decoded)=>{
        if(err){
            return res.sendStatus(204);
        }
        else{
            console.log("Token is valid");
            return res.sendStatus(200);
        }
    })
}
module.exports = {
    authMiddle:authMiddle,
}
