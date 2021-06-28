
const express = require("express");
const DoctorRouter = express.Router();
const DoctorController = require('./doctor.controller');


DoctorRouter.post('/signup',DoctorController.register);

// DoctorRouter.get('/signup', (req, res) => {
//    res.send('Hello doctor!')
//   });

DoctorRouter.post('/signin',DoctorController.signin);

DoctorRouter.get('/:email',DoctorController.getUser);

// DoctorRouter.post('/book', DoctorController.book);

// DoctorRouter.delete('/deletebook', DoctorController.deletebook);

// DoctorRouter.get('/getbook/:userid', DoctorController.getbook);

// DoctorRouter.get('/getbookbyid/:bookid', DoctorController.getbookById);

// DoctorRouter.put('/updateProfile', DoctorController.updateProfile);

// DoctorRouter.put('/forgetPassword', DoctorController.forgetPassword);

// DoctorRouter.put('/makePayment', DoctorController.makePayment);

// DoctorRouter.get('/:email/:token',DoctorController.verifyEmail);

module.exports = DoctorRouter;