
const express = require("express");
const DoctorRouter = express.Router();
const DoctorController = require('./doctor.controller');


DoctorRouter.post('/signup',DoctorController.register);

// DoctorRouter.get('/signup', (req, res) => {
//    res.send('Hello doctor!')
//   });

DoctorRouter.post('/signin',DoctorController.signin);

DoctorRouter.get('/:email',DoctorController.getUser);


module.exports = DoctorRouter;