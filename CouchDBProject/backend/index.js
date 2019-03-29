/* Start an app */
var express = require('express');
var app = express();
var port = process.env.PORT || 8000;
var path = require('path');

/* Connect to the database */
const NodeCouchDb = require('node-couchdb');
const couch = new NodeCouchDb({
    auth: {
        user: 'admin',
        pass: 'fsfbeu1997'
    }
});

//Function that generates token
var generateToken = require('./utils/generateToken.js').generateToken

/* Middlewares */
var authMiddle =require('./utils/middleware.js').authMiddle;
var checkToken =require('./utils/middleware.js').checkToken;
var sendBackInfos =require('./utils/middleware.js').sendBackInfos

/* Parsing the body of post requests */
var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

/* For sign Up we dont include the middleware */
app.get('/signUp',(req,res)=>{
    res.sendFile( path.join( __dirname, '../frontend/build', 'index.html' ));
})
app.get('/login',(req,res)=>{
    res.sendFile( path.join( __dirname, '../frontend/build', 'index.html' ));
})

/* Request to create new user */
app.post('/createUser',(req,res)=>{

    /* Get the user from the request */
    var user = req.body.user

    /* Unique email,username */
    const mangoQuery={
        "selector":{
            "$or":[{"password":user.password,"username":user.username,"email":user.email}
            ,{"username":user.username},{"email":user.email}]
        }
    }
    const parameters = {};

    /* Check if the user exists */
    couch.mango("users",mangoQuery,parameters)
    .then(({data, headers, status})=>{

        /* If the user dont exist create one */
        if(data.docs.length == 0){
            couch.insert("users", {
                email:user.email,
                password:user.password,
                username:user.username,
                Address:user.Address,
            }).then(({data, headers, status}) => {},err => {
                console.log("[ERROR 2] : Failed to create a new user.");
            });
            res.send({status:200});
        }
        else{
            /* Inform the frontend that the user exists */
            console.log("[ERROR 1] User already exists");
            res.send({status:204});
        }
    });
})

app.post('/authenticateUser',(req,res)=>{
    /* Get the user from the request */
    var user = req.body.user

    const mangoQuery = {
        "selector": {
            "password":user.password, /* The parameters must be unique */
            "username":user.username,
        }
    };

    const parameters = {};

    /* Check if the user exists */
    couch.mango("users",mangoQuery,parameters)
    .then(({data, headers, status})=>{

        /* If the user dont exist dont login */
        if(data.docs.length == 0){
            console.log("Failed to authenticate.");
            res.send({status:204});
        }
        else{
            /* login and give new token */
            console.log("Authentication success.");

            /* Generate the token for authentication */
            let tok =generateToken({username:user.username,password:user.password});
        
            /* Check if the user has been authenticated at the past */
            couch.mango("authentication",mangoQuery,parameters)
            .then(({data, headers, status})=>{
        
                /* If the user has not been already authenticated at the past */
                if(data.docs.length == 0){

                    /* Save the token to database */
                    couch.insert("authentication", {
                        username:user.username,
                        password:user.password,
                        token:tok,
                    }).then(({data, headers, status}) => {},err => {
                        console.log("[ERROR 1] : Failed to add a new user to authentication.");
                    });
                }
                else{
                    var userCred = data.docs[0];
                    console.log(userCred)
                    couch.update("authentication", {
                        _id: userCred._id,
                        _rev: userCred._rev,
                        username:userCred.username,
                        password:userCred.password,
                        token:tok,
                    }).then(({data, headers, status}) => {}, err => {
                        console.log("[ERROR] : Token refresh.");
                    });
                }
            });
            res.send({status:200,token:tok})
        }
    });
})

/* We use the middleware to every request except sign up */
app.use('/checkToken',checkToken) //For token checking
app.use('/addNewRestaurant',authMiddle) //To add a restaurant
app.use('/getRestaurants',authMiddle) //To add a restaurant
app.use('/getPersonalInfoForUser',sendBackInfos) //Retrieve info from user

/*Get requests */
app.get('/',(req,res)=>{
    res.sendFile( path.join( __dirname, '../frontend/build', 'index.html' ));
})
/*Get requests */
app.get('/addRestaurant',(req,res)=>{
    res.sendFile( path.join( __dirname, '../frontend/build', 'index.html' ));
})
app.get('/personalInfo',(req,res)=>{
    res.sendFile( path.join( __dirname, '../frontend/build', 'index.html' ));
})


/* Post requests */ 
app.post('/addNewRestaurant',(req,res)=>{
    
    /* Get the restaurant details from the body */
    var restaurant = req.body.restaurant;
    console.log(restaurant)
    const mangoQuery = {
        "selector": {
            "restaurantName":restaurant.restaurantName,
        }
    };

    const parameters = {};
    couch.mango("restaurants",mangoQuery,parameters)
    .then(({data, headers, status})=>{
        if(data.docs.length === 0){

            /* Save the restaurant to database */
            couch.insert("restaurants", {
                restaurantName:restaurant.restaurantName,
                Address:restaurant.Address,
                phone:restaurant.phone,
                priceRange:restaurant.priceRange,
                city:restaurant.city,
                category:restaurant.category,
                estimatedDeliveryTime:restaurant.estimatedDeliveryTime,
                rating:[],
            }).then(({data, headers, status}) => {},err => {
                console.log("[ERROR] : Failed to add a new restaurant.");
            });

            res.send({status:200});
        }
        else{
            console.log("Restaurant already exists!!!");
            res.send({status:205});
        }
    })
})


app.post('/getRestaurants',(req,res)=>{

    //Set some parameters for the query
    var limit = 1;
    var numOfPages = req.body.numOfPages;

    const mangoQuery = {
        "selector":{

        },
        "limit":limit,
        "skip": numOfPages*limit,
    };

    const parameters = {};
    couch.mango("restaurants",mangoQuery,parameters)
    .then(({data, headers, status})=>{
        console.log(data.docs)
        res.send({status:200,results:data.docs})
    })
    
})

/* Static parts */
app.use(express.static(path.join(__dirname+'/../frontend/build')));

/* Server listens to localhost:8000 */
app.listen(port,()=>{
    console.log("App is running localhost:"+port);
})
