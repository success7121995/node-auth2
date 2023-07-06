const mongoose = require('mongoose');
const { isEmail } = require('validator');

// password validator
const isValid = (val) => {
    const regex = /(?=.*[A-Za-z])(?=.*[0-9]])/;
    return regex.test(val);
}

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required.'],
        maxlength: [8, 'Username maximun length is 8.']
    },
    email: {
        type: String,
        required: [true, 'Email is required.'],
        validate: [isEmail, 'Email is not valid.'],
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'Password is required.'],
        minlength: [6, 'Password minimum length is 6.'],
        validate: [isValid, 'Password must contain characters and numbers.']
    }
}, {
    roles: []
});