const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "email is required"],
    },
    name: {
        type: String,
        required: [true, "name is required"],
    },
    password: {
        type: String,
        required: [true, "A password must be there."],
    },
}, { timestamps: true });

module.exports = mongoose.model('users', userSchema);