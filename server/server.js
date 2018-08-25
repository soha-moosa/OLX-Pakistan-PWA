const express = require('express')();
const cors = require('cors');
const bodyParser = require('body-parser'); 
const port= process.env.PORT || 8080;
const productRoutes = require('./products/productRoutes');
const userRoutes = require('./users/userRoutes');
express.use(cors());
require('./dbConnection.js');
express.use(bodyParser.urlencoded({extended: true}));
express.use(bodyParser.json());
// Routes
express.use('/products', productRoutes);
express.use('/users', userRoutes)
express.listen( port, ()=>{
    console.log(`Server is running on ${port}`)
});