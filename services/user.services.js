const { User } = require('../models/user');
const { Booking } = require('../models/booking');
const bcrypt = require("bcrypt");


exports.getUserByEmail = async (query) => {
    console.log("query",query);
    const user = await User.findOne(query);
    return user;
};
exports.create = async (query) => {
    console.log("query",query);
    const user = new User(query);
    console.log(user);
    user.password = await bcrypt.hash(user.password, 10);
    console.log(user);
    return await user.save();

};
exports.approvebook = async (query,data) => {
    console.log("data",data);
    console.log("query",query);
   const user = await Booking.findOneAndUpdate(query,data,{new:true});
   return user;
};
exports.resetPassword = async (query,data) => {
    const user = await User.findOneAndUpdate(query,data,{new:true});
    return user;
};
exports.book = async (query) => {
    const booking = new Booking(query);
    return await booking.save();
}
exports.getbook = async (query) => {
    const book = await Booking.find(query);
    return book;
}


exports.getdocbook = async (query) => {
    const book = await Booking.find(query);
    return book;
}

exports.getbookById = async (query) => {
    const book = await Booking.findOne(query);
    return book;
}

exports.getallbook = async (query) => {
    const book = await Booking.find();
    return book;
}

exports.getalldoc = async (query) => {
    const book = await Doctor.find();
    return book;
}
