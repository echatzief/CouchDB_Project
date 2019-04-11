var fs = require('fs');
 
/* Connect to the database */
const NodeCouchDb = require('node-couchdb');
const couch = new NodeCouchDb({
    auth: {
        user: 'admin',
        pass: 'fsfbeu1997'
    }
});

/* Read the content */
var contents = fs.readFileSync("data.json");
/* Parse the json */
var jsonContent = JSON.parse(contents);

/* Get the users,restaurants */
var users = jsonContent.users;
var restaurants = jsonContent.restaurants;


/* Insert Data */
for(let i=0;i<users.length;i++){
    couch.insert("users", {
        email:users[i].email,
        password:users[i].password,
        username:users[i].username,
        Address:users[i].Address,
    }).then(({data, headers, status}) => {},err => {
        console.log("[ERROR] : Failed to create a new user.");
    });
}
for(let i=0;i<restaurants.length;i++){
    couch.insert("restaurants", {
        restaurantName:restaurants[i].restaurantName,
        Address:restaurants[i].Address,
        phone:restaurants[i].phone,
        priceRange:restaurants[i].priceRange,
        city:restaurants[i].city,
        category:restaurants[i].category,
        estimatedDeliveryTime:restaurants[i].estimatedDeliveryTime,
        rating:[],
    }).then(({data, headers, status}) => {},err => {
        console.log("[ERROR] : Failed to add a new restaurant.");
    });
}

console.log("Users added.")
console.log("Restaurants added.")