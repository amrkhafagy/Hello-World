

const DoctorServices = require('../services/doctor.services');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");


exports.register = async (req,res) => {

    var user = await DoctorServices.getUserByEmail({email:req.body.email});

    console.log("Doctor",user);
    if(user) { 
        return res.status(409).json({
            error:"Doctor already exists "
        }); 
    }

    user = await DoctorServices.create(req.body);

    await DoctorServices.sendEmail({email:user.email,token:user._id});

    res.status(201).json({
        message: "Doctor Created Success",
        name: user.name,
        email: user.email
    });

};

exports.signin = async (req,res)=>{
  
  var user = await DoctorServices.getUserByEmail({email:req.body.email});

  if(!user){
    return res.status(409).json({
      error:"Doctor Not exists "
    }); 
  }

  const hash = user.password;

  bcrypt.compare(req.body.password, hash, function(err, result) {
      if(result){
        const token= jwt.sign({
            name:user.name,
            email:user.email,
            userType:'User',
            userId:user._id

        },
        config.get('myprivatekey')
        ,
       {
          expiresIn:"1h"
        }
        );
      console.log("login success "+token)
       res.header("x-auth-token", token).status(200).json({
           message:"login Successfuly...!!!",
           token:token,
           data:user
       });
    }else{

       res.status(404).json({
           message:"Wrong Password"
       });
   }
  });
};

exports.book = async (req, res) => {
  console.log("req", req.body);
  let book = await DoctorServices.getbook({ doctor: req.body.doctor, date: req.body.date, time: req.body.time });
  console.log("book", book);
  if (book) {
    res.status(400).json({
      message: "Doctor Not Available"
    })
  } else {
    book = await DoctorServices.book(req.body);
    var user = await DoctorServices.getUserByEmail({ _id: req.body.user });
  }
      

  exports.getUser = async (req, res) => {
      var user = await DoctorServices.getUserByEmail({ email: req.params.email });
      if (user) {
        res.status(200).json({
          data: user
        });
      } else {
        res.status(400).json({
          message: "User Not found",
        });
      }
    }

  }

