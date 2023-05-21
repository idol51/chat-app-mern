const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessagesSchema = new Schema({
    message: String,
    userName: String,
    roomName: String,
    createdTime: Date
});

const Messages = mongoose.model('messages', MessagesSchema);

module.exports = Messages;
