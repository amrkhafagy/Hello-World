const express = require("express");
const UserRouter = express.Router();
const UserController = require('./controller');


UserRouter.post('/signup', UserController.registerUser);
UserRouter.post('/signin',UserController.signinUser);
UserRouter.get('/getallbookings',UserController.getbook);
UserRouter.get('/getalldoctors',UserController.getdoctors)
UserRouter.get('/getallpatients',UserController.getpatients)


UserRouter.get('/:email',UserController.getUser);

UserRouter.post('/book', UserController.book);

UserRouter.delete('/deletebook', UserController.deletebook);

UserRouter.put('/approvebook', UserController.approvebook);

UserRouter.get('/getbook/:userid', UserController.getmybook);


UserRouter.get('/getdocbook/:docname', UserController.getdocbook);

UserRouter.get('/getbookbyid/:bookid', UserController.getbookById);

UserRouter.put('/updateProfile', UserController.updateProfile);

UserRouter.put('/forgetPassword', UserController.forgetPassword);

UserRouter.get('/:email/:token', UserController.verifyEmail);

module.exports = UserRouter;