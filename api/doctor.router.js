const express = require("express");
const DoctorRouter = express.Router();
const DoctorControllers = require('./doctorController');


DoctorRouter.post('/signup',DoctorControllers.register);

//DoctorRouter.get('/signup', (req, res) => {
   // res.send('Hello doctor!')
//});


DoctorRouter.post('/signin',DoctorControllers.signin);

DoctorRouter.get('/:email', DoctorControllers.getUser);




//DoctorRouter.put('/updateProfile', DoctorControllers.updateProfile);

//DoctorRouter.put('/forgetPassword', DoctorControllers.forgetPassword);


module.exports = DoctorRouter;