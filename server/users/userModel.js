const mongoose = require('mongoose');
const UserSchema= new mongoose.Schema({
    email: {
        type: String,
        require: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
        
    }
});

module.exports = mongoose.model('User',UserSchema) //modal name and modal schema