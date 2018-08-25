const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ProductSchema = new Schema({
    adTitle: {
        type: String,
        require: true
    },
    category: {
        type: String,
        require: true
    },
    adDescription: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    number: {
        type: Number,
        require: true
    },
    province: {
        type: String,
        require: true
    },
    productImage: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model('Product', ProductSchema)