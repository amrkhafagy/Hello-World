const express = require("express");
const UserRouter = express.Router();
const UserController = require('./controller');


UserRouter.post('/signup', UserController.registerUser);
UserRouter.post('/signin',UserController.signinUser);
UserRouter.get('/getallbookings',UserController.getbook);
UserRouter.get('/getalldoctors',UserController.getdoctors)
UserRouter.get('/getallpatients',UserController.getpatients)
