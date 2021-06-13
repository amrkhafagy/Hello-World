// require imports packages required by the application

const express = require('express');

const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const config = require("config");

var mongoose = require('mongoose');
var mongoDB = 'mongodb://127.0.0.1/testno';


// Define Host name and TCP Port for the server

const HOST = '127.0.0.1';

const PORT = 8080;


//Get the default connection
var db = mongoose.connection;

// app is a new instance of express (the web app framework)

let app = express();

// Application settings

app.use((req, res, next) => {

// Globally set Content-Type header for the application

res.setHeader("Content-Type", "application/json");

next();

});
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Allow app to support differnt body content types (using the bidyParser package)

app.use(bodyParser.text());

app.use(bodyParser.json()); // support json encoded bodies

app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// Controllers - Configure app Routes to handle requests from browser

// The home page

app.use('/', require('./controllers/index'));

// catch 404 and forward to error handler

app.use(function (req, res, next) {

var err = new Error('Not Found: '+ req.method + ":" + req.originalUrl);

err.status = 404;

next(err);

});

// Start the HTTP server using HOST address and PORT consts defined above

// Listen for incoming connections

var server = app.listen(PORT, HOST, function() {

console.log(`Express server listening on http://${HOST}:${PORT}`);

});

// export this as a module, making the app object available when imported.

module.exports = app;