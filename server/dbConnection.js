const mongoose = require('mongoose');
const config = require('./config.js');
mongoose.connect(
    config.DATABASE_URL,
    (error)=>{
    if(error){
        return console.log("Disconnected!");
    }

    console.log("Connected Successfully!");
});