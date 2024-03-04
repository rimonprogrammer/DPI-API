const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        min : 3,
        max : 30
    },
    phone : {
        type : Number,
        required : true,
        unique : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true, 
        min : 6,
        max : 40
    }
});

module.exports = mongoose.model('DPI_Users', UserSchema);