const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrpyt = require('bcrypt');

// password validator
const isValid = (val) => {
    const regex = /(?=.*[A-Za-z])(?=.*[0-9])/;
    return regex.test(val);
};

// user
const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please enter a username.'],
        maxLength: [8, 'Username is too long.']
    },
    email : {
        type: String,
        required: [true, 'Please enter an email.'],
        lowercase: true,
        validate: [isEmail, 'Email is not valid.']
    },
    password: {
        type: String,
        required: [true, 'please enter an password.'],
        minlength: [6, 'Password must be at least 6 charcters.'],
        validate: [isValid, 'Password must contain characters and numbers']
    },
});

// hash password
userSchema.pre('save', async function(next) {
    const salt = await bcrpyt.genSalt(10);
    this.password = await bcrpyt.hash(this.password, salt);
    next();
});

// create User model
const User = mongoose.model('Users', userSchema);

// exports
module.exports = User;