
const express = require("express");
const DoctorController = require('./doctor.controller');
const DoctorRouter = express.Router();


DoctorRouter.post('/signup',DoctorController.register);

DoctorRouter.post('/signin',DoctorController.signin);

DoctorRouter.get('/:email',DoctorController.getUser);


module.exports = DoctorRouter;