const express = require('express')();
const cors = require('cors');
const bodyParser = require('body-parser'); 
const port= process.env.PORT || 8080;
const productRoutes = require('./products/productRoutes');
const userRoutes = require('./users/userRoutes');
const upload = require('express-fileupload');
express.use(upload());
express.use(cors());
require('./dbConnection.js');

express.use(bodyParser.urlencoded({ limit: '50mb' ,extended: true}));
express.use(bodyParser.json({limit: '50mb'}));
// Routes
express.use('/products', productRoutes);
express.use('/users', userRoutes)
express.listen( port, ()=>{
    console.log(`Server is running on ${port}`)
});

express.get("/", (req,res)=>{
    res.sendFile(__dirname+"./html/submitAd.html");
})
express.get("/", (req,res)=>{
    if(req.files){
        // let file = req.files.filename,
        // filename = req.files.filename.name
        console.log(req.files);
    }
})
