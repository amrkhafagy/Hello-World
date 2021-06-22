const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");


exports.registerUser = async (req, res) => {
    
    var user = await UserServices.getUserByEmail({email:req.body.email});

    console.log("User",user);
    if(user) { 
        return res.status(409).json({
            error:"User already exists "
        }); 
    }
    user = await UserServices.create(req.body);


    res.status(201).json({
        message: "User Created Success",
        name: user.name,
        email: user.email
    });



};

exports.signinUser = async (req,res)=>{
  
    var user = await UserServices.getUserByEmail({email:req.body.email});
  
    if(!user){
      return res.status(409).json({
        error:"User Not exists "
      }); 
    }
    const hash = user.password;

  bcrypt.compare(req.body.password, hash, function(err, result) {
      if(result){
        const token= jwt.sign({
            name:user.name,
            email:user.email,
            userType:'User',
            userId: user._id
            
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
 exports.book = async (req,res) => {
    console.log("req",req.body);
    let book = await UserServices.getbook({doctor:req.body.doctor,date:req.body.date,time:req.body.time});
    console.log("booking found is : ",book.length);
      if(book.length!=0){
        res.status(400).json({
          message:"Doctor Not Available"
        })
      }else{
        book = await UserServices.book(req.body);
        console.log("book",book);
        res.status(200).json({
          message:"Appointment Created Success",
          data:book
        });
      }
  
};
  
exports.getmybook = async (req,res) => {
    let book = await UserServices.getbook({user:req.params.userid});
    if(book){
      res.status(200).json({
        data:book
      })
    }else{
      res.status(400).json({
        message:"Appointment Not Found",
      });
    }
  };