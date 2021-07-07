// require imports packages required by the application
const express = require('express');
const bodyParser = require('body-parser');
const config = require("config");
const mongoose = require('mongoose');
const fetch = require('node-fetch');

const cors = require('cors');
const app = express();
const Bluebird = require('bluebird');
 
fetch.Promise = Bluebird;


// UserRouter= require('./api/routes')



app.use(cors())
//const HOST = '127.0.0.1';
const PORT = 550;

// db connection
if (!config.get("myprivatekey")) {
    console.error("FATAL ERROR: myprivatekey is not defined.");
    process.exit(1);
}


var mongoDB = config.get("uri");



mongoose.connect(mongoDB, {useNewUrlParser: true, useCreateIndex: true,useUnifiedTopology: true})
.then(() => {console.log("Connected to MongoDB...")})
  .catch(err => console.error("Could not connect to MongoDB...")
);
  


//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


// Allow app to support differnt body content types (using the bidyParser package)
app.use(express.json());
//app.use(body.json());
//app.use(body.urlencoded({extended:false}));
app.get('/', (req, res) => {
  res.send('Hello World!')
})



// Application settings

app.get("/", (req,res) =>{
  res.render("home");
})
app.get("/userprofile" ,(req,res) =>{
  res.render("userprofile");
})
app.get("/login",(req,res)=>{
  res.render("login");
});
app.get("/register",(req,res)=>{
  res.render("register");
});


app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


//catch 404 and forward to error handler
//app.use(function (req, res, next) {

  //var err = new Error('Not Found: '+ req.method + ":" + req.originalUrl);
  
  //err.status = 404;
  
 //next(err);
  
 // });





app.use('/Api/v1/user', require('./api/routes'));
app.use('/Api/v1/doctor', require('./api/doctor.router'));






// Start the HTTP server using HOST address and PORT consts defined above

// Listen for incoming connections

var server = app.listen(PORT,  function() {

console.log(`Express server listening on  http://localhost:${PORT}`);

});

// export this as a module, making the app object available when imported.

module.exports = app;