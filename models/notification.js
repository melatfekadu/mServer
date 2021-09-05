const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Notification = mongoose.model('Notification',
    new Schema({
        for: String,
        complaint_id: String
    },
    {
        collection: "notification"
    })
)
module.exports = Notification;
