const express = require("express");
const DoctorRouter = express.Router();

const DoctorController = require('./doctorController');
DoctorRouter.post('/signup', DoctorController.register);



DoctorRouter.get('/signup', (req, res) => {
    res.send('Hello doctor!')
});


DoctorRouter.post('/signin',DoctorController.signin);

DoctorRouter.get('/:email', DoctorController.getUser);




DoctorRouter.put('/updateProfile', DoctorController.updateProfile);

DoctorRouter.put('/forgetPassword', DoctorController.forgetPassword);


module.exports = DoctorRouter;