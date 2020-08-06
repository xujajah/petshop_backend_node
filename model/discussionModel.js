const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const DisSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    question: {
        type: String,
        required: true
    },
    comments: [{
        text: String,
        author: {type: Schema.Types.ObjectId, ref: 'user'}
    }]


});

const DiscussModel = mongoose.model('forum', DisSchema);

module.exports = DiscussModel;