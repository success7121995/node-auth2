const mongoose = require('mongoose');

// product schema
const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

// Smoothies
const Smoothies = mongoose.model('smoothies', productSchema);

// exports
module.exports = Smoothies;