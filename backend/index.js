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

/* Function that generates token */
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

            /* Login and give new token */
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
                    
                    /* Save the generated credentials to database */
                    var userCred = data.docs[0];
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
app.use('/changeField',authMiddle) //To change user infos
app.use('/rateRestaurant',authMiddle) //Rate a restaurant
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


/* Post requests  that are protected with middleware and requires token */ 

/* Add a new restaurant to the database */
app.post('/addNewRestaurant',(req,res)=>{
    
    /* Get the restaurant details from the body */
    var restaurant = req.body.restaurant;
    console.log("Wanna add new Restaurant: ")
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

/* 
    Fetch to frontend the restaurant that are included inside 
    our database
*/
app.post('/getRestaurants',(req,res)=>{

    /* Set some parameters for the query */
    var limit = 1;
    var numOfPages = req.body.numOfPages;

    const mangoQuery = {
        "selector":{
        },
        "limit":limit,
        "skip": numOfPages*limit,
    };

    /* Return specific number of restaurant to frontend */
    const parameters = {};
    couch.mango("restaurants",mangoQuery,parameters)
    .then(({data, headers, status})=>{
        res.send({status:200,results:data.docs})
    })
    
})

/* Edit some profile details */
app.post('/changeField',(req,res)=>{
    
    /* Retrieve the body parameters */
    var user = req.body.data;
    var type = req.body.type;

    if(type === "username"){

        const mangoQuery = {
            "selector":{
                "username":user.username,
            },
        };
        
        /* Change the user details */
        const parameters = {};
        couch.mango("users",mangoQuery,parameters)
        .then(({data, headers, status})=>{
            
            couch.update("users", {
                _id: data.docs[0]._id,
                _rev: data.docs[0]._rev,
                username:user.inputField,
                email:data.docs[0].email,
                password:data.docs[0].password,
                Address:data.docs[0].Address,
            }).then(({data, headers, status}) => {

                /* Change the authentication details */
                couch.mango("authentication",mangoQuery,parameters)
                .then(({data, headers, status})=>{

                    let tok =generateToken({username:user.inputField,password:data.docs[0].password});
                    couch.update("authentication", {
                        _id: data.docs[0]._id,
                        _rev: data.docs[0]._rev,
                        username:user.inputField,
                        password:data.docs[0].password,
                        token:tok,
                    }).then(({data, headers, status}) => {

                        /* Change the rating details */
                        const mangoQuery = {
                            "selector":{
                            },
                        };
                        couch.mango("restaurants",mangoQuery,parameters)
                        .then(({data, headers, status})=>{

                            for(let i = 0 ;i<data.docs.length;i++){
                                var rating = data.docs[i].rating;

                                /* Update the rating after name change */
                                for(let j = 0; j<rating.length;j++){
                                    if(rating[j].username === user.username){
                                        rating[j].username = user.inputField;
                                        couch.update("restaurants", {
                                            _id: data.docs[i]._id,
                                            _rev: data.docs[i]._rev,
                                            restaurantName:data.docs[i].restaurantName,
                                            Address:data.docs[i].Address,
                                            phone:data.docs[i].phone,
                                            priceRange:data.docs[i].priceRange,
                                            city:data.docs[i].city,
                                            category:data.docs[i].category,
                                            estimatedDeliveryTime:data.docs[i].estimatedDeliveryTime,
                                            rating:rating,
                                        }).then(({data, headers, status}) => {
                                    
                                        })
                                    }
                                }
                            }
                            console.log("Username changed.");
                            res.send({status:200,token:tok})
                        })
                    })
                })   
            })
        })
    }
    else if(type === "password"){
        
        const mangoQuery = {
            "selector":{
                "username":user.username,
            },
        };

        /* Change the user details */
        const parameters = {};
        couch.mango("users",mangoQuery,parameters)
        .then(({data, headers, status})=>{

            couch.update("users", {
                _id: data.docs[0]._id,
                _rev: data.docs[0]._rev,
                username:data.docs[0].username,
                email:data.docs[0].email,
                password:user.inputField,
                Address:data.docs[0].Address,
            }).then(({data, headers, status}) => {

                /* Change the authentication details */
                couch.mango("authentication",mangoQuery,parameters)
                .then(({data, headers, status})=>{
                    console.log(data.docs)
        
                    let tok =generateToken({username:data.docs[0].username,password:user.inputField});
                    couch.update("authentication", {
                        _id: data.docs[0]._id,
                        _rev: data.docs[0]._rev,
                        username:data.docs[0].username,
                        password:user.password,
                        token:tok,
                    }).then(({data, headers, status}) => {
                        console.log("Password changed.")
                        res.send({status:200,token:tok})
                    })
                })
            })
        })
    }
    else if(type === "email"){

        /* Change the user details */
        const mangoQuery = {
            "selector":{
                "username":user.username,
            },
        };
    
        const parameters = {};
        couch.mango("users",mangoQuery,parameters)
        .then(({data, headers, status})=>{

            couch.update("users", {
                _id: data.docs[0]._id,
                _rev: data.docs[0]._rev,
                username:data.docs[0].username,
                email:user.inputField,
                password:data.docs[0].password,
                Address:data.docs[0].Address,
            }).then(({data, headers, status}) => {
                console.log("E-mail changed.");
                res.send({status:200})
            })
        })
    }
    else if(type === "Address"){

        
        /* Change the user details */
        const mangoQuery = {
            "selector":{
                "username":user.username,
            },
        };
    
        const parameters = {};
        couch.mango("users",mangoQuery,parameters)
        .then(({data, headers, status})=>{

            couch.update("users", {
                _id: data.docs[0]._id,
                _rev: data.docs[0]._rev,
                username:data.docs[0].username,
                email:data.docs[0].email,
                password:data.docs[0].password,
                Address:user.inputField,
            }).then(({data, headers, status}) => {
                console.log("Address changed.")
                res.send({status:200})
            })
        })
    }
    
})


/* Rate a restaurant of the existing ones */
app.post('/rateRestaurant',(req,res)=>{
    /* Retrieve parameters */
    var rate = req.body.rate
    var username = req.body.username
    var restaurantName = req.body.restaurantName

    /* Change the restaurantRating*/
    const mangoQuery = {
        "selector":{
            "restaurantName":restaurantName,
        },
    };

    const parameters = {};
    couch.mango("restaurants",mangoQuery,parameters)
    .then(({data, headers, status})=>{

        /* Retrieve restaurant details */
        var rates = data.docs[0].rating

        var inside = false
        for(let i = 0;i<rates.length;i++){

            /* Check if the user has already rate it */
            if(rates[i].username === username){
                rates[i].rate=rate
                inside = true
            }
        }

        /* If changed */
        if(inside === true){
            console.log("Rate altered.");
        }
        else{
            console.log("Rate inserted.");
            rates.push({username:username,rate:rate})
        }

        /* Update the restaurant */
        couch.update("restaurants", {
            _id: data.docs[0]._id,
            _rev: data.docs[0]._rev,
            restaurantName:data.docs[0].restaurantName,
            Address:data.docs[0].Address,
            phone:data.docs[0].phone,
            priceRange:data.docs[0].priceRange,
            city:data.docs[0].city,
            category:data.docs[0].category,
            estimatedDeliveryTime:data.docs[0].estimatedDeliveryTime,
            rating:rates,
        }).then(({data, headers, status}) => {
            console.log("Rate of restaurant updated.");
            res.send({status:200})
        })
    })
})
/* Static parts */
app.use(express.static(path.join(__dirname+'/../frontend/build')));

/* Server listens to localhost:8000 */
app.listen(port,()=>{
    console.log("App is running localhost:"+port);
})
