const mongoose = require('mongoose');

const messageCountSchema = mongoose.Schema({
    //get ID
    _id: {
        type: String,
        required: true
    },
    //get message count
    messageCount: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('message-count', messageCountSchema, 'message-count');