const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    user: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    level: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    phone: {
        type: String,
        require: true,
    }

})

const User = mongoose.model("User", UserSchema);

module.exports = User;