const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

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
        lowercase: true,
        validate: [isEmail, 'Email is not valid.']
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [6, 'Minimum 6 character is required.'],
        validate: [isValid, 'Password must contain both characters and numbers.']
    }
});

// hash password
userSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// user schema
const User = mongoose.model('Users', userSchema);

// exports
module.exports = User;