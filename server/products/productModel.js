const mongoose = require('mongoose');
const typeObject = {
    type: String,
    require: true
};
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
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    number: {
        type: String,
        require: true
    },
    province: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model('Product', ProductSchema)