var jwt = require('jsonwebtoken');

/* Retrieve the private key */
var privateKey = require('./config.js').key

/* Generate the token for the user */
var generateToken = function(user){

    var credentials ={
        username:user.username,
        password:user.password,
    }
    return jwt.sign(credentials,privateKey,{
        expiresIn: 60 *60 * 24,
    })
}

module.exports={
    generateToken:generateToken
}