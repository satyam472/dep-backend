const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    first_name: {
        type: String,
    },
    last_name: {
        type: String,
    },
    email_id: {
        type: String,
        unique: true,
        required: [true, 'email id is required'],
    },
    password: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now,
    }
});
const UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;