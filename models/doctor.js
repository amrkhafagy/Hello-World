const config = require('config');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');


const DoctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255
    },
    
    address:{
        type:String,
    },
    phone:{
        type:String,
    },
    
    type:{
        type:String
    },
    status:{
        type:String
    }
});

DoctorSchema.methods.generateAuthToken = function() { 
    const token = jwt.sign({ _id: this._id, name:this.name,email:this.email}, config.get('myprivatekey')); 
    return token;
}
const doctor = mongoose.model('Doctor', DoctorSchema);

exports.Doctor = doctor; 
