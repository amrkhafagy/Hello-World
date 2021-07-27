const  Doctor  = require('../models/doctor');
const booking = require('../models/booking')

const bcrypt = require("bcrypt");

 

exports.getUserByEmail = async (query) => {
    console.log("query",query);
    const user = await Doctor.findOne(query);
    return user;
};



exports.create = async (query) => {
    console.log("query",query);
    const user = new Doctor(query);
    console.log(user);
    user.password = await bcrypt.hash(user.password, 10);
    console.log(user);
    return await user.save();

};


exports.update = async (query,data) => {
    console.log("data",data);
    console.log("query",query);
   const user = await Doctor.findOneAndUpdate(query,{$set:data},{new:true});
   return user;
};

exports.resetPassword = async (query,data) => {
    const user = await Doctor.findOneAndUpdate(query,data,{new:true});
    return user;
};


//exports.book = async (query) => {
  //  const booking = new Booking(query);
   // return await booking.save();
//};
    
//exports.getbook = async (query) => {
    //const book = await Booking.findOne(query);
    //return book;
//};