const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
const DoctorServices = require('../services/doctor.services');

exports.register = async (req,res) => {

    var user = await DoctorServices.getUserByEmail({email:req.body.email});

    console.log("Doctor",user);
    if(user) { 
        return res.status(409).json({
            error:"Doctor already exists "
        });
        user = await DoctorServices.create(req.body);

    
    
        res.status(201).json({
            message: "Doctor Created Success",
            name: user.name,
            email: user.email
        });
    
    };
    }