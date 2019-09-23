const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ProductSchema = new Schema({
    adTitle: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    adDescription: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    },
    province: {
        type: String,
        required: true
    },
    imageURL:{
        type: String
    }
    // productImage: {
    //     type: String,
    //     required: true
    // }
});

module.exports = mongoose.model('Product', ProductSchema)