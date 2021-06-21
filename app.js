// require imports packages required by the application
const express = require('express');
const bodyParser = require('body-parser');
const config = require("config");
const mongoose = require('mongoose');
const  cors = require('cors');


// Define Host name and TCP Port for the server

// app is a new instance of express (the web app framework)

let app = express();

const HOST = '127.0.0.1';

const PORT = 5000;
// db connection
if (!config.get("myprivatekey")) {
    console.error("FATAL ERROR: myprivatekey is not defined.");
    process.exit(1);
}


var mongoDB = config.get("uri");

mongoose.connect(mongoDB, {useNewUrlParser: true, useCreateIndex: true,useUnifiedTopology: true})
.then(() => {console.log("Connected to MongoDB...")})
    .catch(err => console.error("Could not connect to MongoDB..."));;

    //Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Allow app to support differnt body content types (using the bidyParser package)
app.use(express.json());
//app.use(body.json()); // support json encoded bodies
//app.use(body.urlencoded({extended:false})); // support encoded bodies
app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


// Application settings

app.use((req, res, next) => {

// Globally set Content-Type header for the application
res.setHeader("Content-Type", "application/json");

next();

});





//Controllers = Configure app Routes to handle requests from browser
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