const mongoose = require('mongoose');
const Schema = mongoose.Schema

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String
    },
    user: [{
        ref: 'User',
        type: Schema.Types.ObjectId
    }]

})

module.exports = mongoose.model('Product', productSchema)