var mongoose = require('mongoose');
var userSchema = require("./user.js")

var messageSchema = mongoose.Schema({
    _sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    _recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    unread: {
        type: Boolean,
        default: true,
    },
    content: {
        type: String,
        required: true,
        minlength: [1, "Come on just type ONE character."],
        maxlength: [3000, "This isn't War and Peace. Keep it short."]
    }
}, {timestamps: true})

mongoose.model('Message', messageSchema);