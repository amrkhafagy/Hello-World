const config = require('config');
const mongoose = require('mongoose');
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
