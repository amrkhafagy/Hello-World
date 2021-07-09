const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const UserServices = require('../services/user.services');


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
           message:"login Successfuly...",
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
  console.log("req", req.body);
  let book = await UserServices.getbook({ doctor: req.body.doctor, date: req.body.date, time: req.body.time });
    console.log("booking found is : ",book.length);
      if(book.length!=0){
        res.status(400).json({
          message:"Doctor Not Available"
        })
      }
      else
      {
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
exports.getdocbook = async (req,res) => {
    let book = await UserServices.getdocbook({doctor:req.params.docname});
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
  
  exports.getbook = async (req,res) => {
    let book = await UserServices.getallbook({user:req.params.userid});
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
  
exports.getdoctors = async (req,res) => {
    let book = await UserServices.getalldoc();
    if(book){
      res.status(200).json({
        data:book    })
    }else{
      res.status(400).json({
        message:"Doctor Not Found",
      });
    }
};
  
exports.getpatients = async (req,res) => {
    let book = await UserServices.getallpat();
    if(book){
      res.status(200).json({
        data:book    })
    }else{
      res.status(400).json({
        message:" Not Found",
      });
    }
  };
  
  exports.getbookById = async (req,res) => {
    let book = await UserServices.getbookById({_id:req.params.bookid});
    console.log(book);
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
  

exports.deletebook = async (req,res) => {
    let book = await UserServices.deletebook(req.body);
    if(book){
      res.status(200).json({
        data:book,
        message:"Appoinment Cancled Success"
      })
    }else{
      res.status(400).json({
        message:"Appointment Not Found",
      });
    }
  
};
exports.approvebook = async (req,res) => {

    console.log("approve book ")
    console.log(req.body)
      let book = await UserServices.approvebook({_id: req.body._id},{status:req.body.status});
      if(book){
        console.log("found ")
    
        res.status(200).json({
          data:book,
          message:"Appoinment approved "
        })
      }else{
        res.status(400).json({
          message:"Appointment Not Found",
        });
      }
    
    };
    
    
    
    exports.updateProfile = async (req,res) => {
         const user = await UserServices.update({email:req.body.email},req.body);
         if(user){
           res.status(200).json({
             message:"User Update Success",
             user
           });
         }else{
          res.status(400).json({
            message:"User Update Faild",
          });
         }
    };
    
    exports.forgetPassword = async (req,res) => {
        const hash = await bcrypt.hash(req.body.password, 10);
        const user = UserServices.resetPassword({email:req.body.email},{password:hash});
        if(user){
          res.status(200).json({
            message:"Password reset success",
            data:user
          });
        } else {
         res.status(400).json({
           message:"User Not found",
         });
        }
};

exports.verifyEmail = async (req, res) => {
    
      var user = await UserServices.getUserByEmail({email:req.params.email});
      if (user && user._id == req.params.token)
      {
        res.send("Account verfied Success");
      }
      console.log("verify email",req.params);
    }
    
exports.getUser = async (req, res) => {
    var user = await UserServices.getUserByEmail({ email: req.params.email });
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

