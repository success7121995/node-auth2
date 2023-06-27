const mongoose = require('mongoose');
const { isEmail } = require('validator');

// password validation
const isValid = (val) => {
    const regex = /(?=.*[A-Za-z])(?=.*[0-9])/
    return regex.test(val);
};

// schema
const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please enter a username.'],
        maxlength: [8, 'Username is too long.']
    },
    email: {
        type: String,
        required: [true, 'Please enter an email.'],
        lowercase: [true, 'Accept lowercase only.'],
        validate: [isEmail, 'Email is not valid.']
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [6, 'Minimum password length is 6'],
        validate: [isValid, 'Password must contain both characters and numbers.']
    }
});

// user schema
const User = mongoose.model('Users', userSchema);

// exports
module.exports = User;