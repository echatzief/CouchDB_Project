//Retrieve the private key
var privateKey = require('./config.js').key
var jwt = require('jsonwebtoken');

//Authentication middleware function
var checkToken=function(req,res,next){

    console.log("INSIDE AUTH")
    //Trying to verify if the token is valid
    jwt.verify(req.body.token,privateKey,(err,decoded)=>{
        if(err){
            console.log("Token is not valid");
            return res.send({status:204});
        }
        else{
            console.log("Token is valid");
            return res.send({status:200});
        }
    })
}
var authMiddle=function(req,res,next){

    //Trying to verify if the token is valid
    jwt.verify(req.body.token,privateKey,(err,decoded)=>{
        if(err){
            console.log("Token is not valid");
            return res.send({status:204});
        }
        else{
            console.log("Token is valid");
            next()
        }
    })
}

var sendBackInfos = function(req,res,next){
    //Trying to verify if the token is valid
    jwt.verify(req.body.token,privateKey,(err,decoded)=>{
        if(err){
            return res.send({status:204});
        }
        else{
            console.log(decoded);
            return res.send({status:200});
        }
    })
}
module.exports = {
    checkToken:checkToken,
    authMiddle:authMiddle,
    sendBackInfos:sendBackInfos,
}
