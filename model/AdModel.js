const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const AdSchema = new Schema({
    owner: {type: Schema.Types.ObjectId, ref: 'user'},
    img: {
        data: Buffer,
        contentType: String
    },
    phone: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    }


});

const AdModel = mongoose.model('ad', AdSchema);

module.exports = AdModel;