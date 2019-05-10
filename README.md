# Restaurant Rating Application

* Application that a user can register and rate some restaurants. It provides also the ability to 
add your restaurant in order to get rated by other users.
* The frontend/UI of the app is made with  [ReactJS](https://reactjs.org/) which is a javascript libary and 
we can components and give functionality to the users based on their needs.
* The backend is based on [NodeJS](https://nodejs.org/en/) and basically on a framework which is called [ExpressJS](https://expressjs.com/) in order to handle the requests that are made from the frontend and deliver the replies.
* In order to save our data that we want to keep we use [CouchDB](http://couchdb.apache.org/) that is a document based
No SQL database.

# Prerequisites
* [ReactJS](https://reactjs.org/)
* [NodeJS](https://nodejs.org/en/)
* [CouchDB](http://couchdb.apache.org/)

# Installing modules that we will need

* Windows
```
    We install the previous modules downloading the wizard.After the installation we are ready to compile the UI 
    and start the server.
```
* Linux
```
    sudo apt-get install apache2  -y
    sudo systemctl start apache2
    sudo systemctl enable apache2
    echo  "deb https://apache.bintray.com/couchdb-deb xenial main"
    curl -L https://couchdb.apache.org/repo/bintray-pubkey.asc \ | sudo apt-key add -
    sudo apt-get update -y
    sudo apt-get install couchdb -y
```

# Compile the user interface
```
    cd frontend
    npm run build
```
# Download server modules and run the server
```
    cd backend
    npm install
    npm start
```
# Initialize the data with some random documents
```
    cd insert_data
    npm install
    npm start
```

