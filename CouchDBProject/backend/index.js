/* Start an app */
var express = require('express');
var app = express();
var port = process.env.PORT || 8000;

//Function that generates token
var generateToken = require('./utils/generateToken.js').generateToken
var jwt = require('jsonwebtoken');

//Retrieve the private key
var privateKey = require('./utils/config.js').key

/* Middlewares */
var middleWare =require('./utils/middleware.js').authMiddle;


/* Parsing the body of post requests */
var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))


app.get('/signUp',(req,res)=>{
    res.send('Sign Up')
})

//We use the middleware to every request except sign up
app.use(middleWare)

/*Get requests */
app.get('/',(req,res)=>{
    var u={
        username:'Jack',
        password:'hd',
    }
    console.log(generateToken(u))
    res.send('Hello World');
})


/* Post requests */ 
/* Server listens to localhost:8000 */
app.listen(port,()=>{
    console.log("App is running localhost:"+port);
})
