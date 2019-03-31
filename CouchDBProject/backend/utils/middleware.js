//Retrieve the private key
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

            /* Search for the user */
            const mangoQuery = {
                "selector": {
                    "password":decoded.password, /* The parameters must be unique */
                    "username":decoded.username,
                }
            };

            const parameters = {};

            couch.mango("users",mangoQuery,parameters)
            .then(({data, headers, status})=>{
                if(data.docs.length === 0){
                    return res.send({status:204});
                }
                else{
                    console.log(data.docs[0])

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
