/* Retrieve the private key */
var privateKey = require('./config.js').key
var jwt = require('jsonwebtoken');

/* Connect to the database */
const NodeCouchDb = require('node-couchdb');
const couch = new NodeCouchDb({
    auth: {
        user: 'admin',
        pass: 'fsfbeu1997'
    }
});

/* Authentication middleware function */
/* Only token check */
var checkToken=function(req,res,next){

    /* Trying to verify if the token is valid */
    jwt.verify(req.body.token,privateKey,(err,decoded)=>{
        if(err){
            console.log("[checkToken]: Token is not valid");
            return res.send({status:204});
        }
        else{
            console.log("[checkToken]: Token is valid");
            return res.send({status:200});
        }
    })
}

/* Check the token first and then processed to request */
var authMiddle=function(req,res,next){

    /* Trying to verify if the token is valid */
    jwt.verify(req.body.token,privateKey,(err,decoded)=>{
        if(err){
            console.log("[authMiddle]: Token is not valid");
            return res.send({status:204});
        }
        else{
            console.log("[authMiddle]: Token is valid");
            next()
        }
    })
}

/* Retrieve from jwt the credentials of the user */
var sendBackInfos = function(req,res,next){

    /* Trying to verify if the token is valid */
    jwt.verify(req.body.token,privateKey,(err,decoded)=>{
        if(err){
            return res.send({status:204});
        }
        else{

            const mangoQuery = {
                "selector": {
                    "password":decoded.password, /* The parameters must be unique */
                    "username":decoded.username,
                }
            };

            const parameters = {};
            /* Search for the user */
            couch.mango("users",mangoQuery,parameters)
            .then(({data, headers, status})=>{
                if(data.docs.length === 0){
                    return res.send({status:204});
                }
                else{
                    /* Send back the info */
                    var userDetails={
                        "username":data.docs[0].username,
                        "email":data.docs[0].email,
                        "Address":data.docs[0].Address,
                    }
                    return res.send({status:200,userDetails:userDetails});
                }
            });
        }
    })
}
module.exports = {
    checkToken:checkToken,
    authMiddle:authMiddle,
    sendBackInfos:sendBackInfos,
}
