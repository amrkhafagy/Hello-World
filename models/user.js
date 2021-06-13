const config = require('config');
const mongoose = require('mongoose');



// mongodb table
const UserSchema = new mongoose.Schema({
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
    profileImage:{ type : String}
});
UserSchema.methods.generateAuthToken = function() { 
    const token = jwt.sign({ _id: this._id, name:this.name,email:this.email}, config.get('myprivatekey')); 
    return token;
  }
  

exports.User = user; 