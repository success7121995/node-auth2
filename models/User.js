const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { isEmail } = require('validator');

// password validator
const isValid = (val) => {
    const regex = /(?=.*[A-Za-z])(?=.*[0-9])/;
    return regex.test(val);
};

// set roles
const ROLES = {
    admin: 'admin',
    user: 'user'
};

// schema structure
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
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required.'],
        minlength: [6, 'Password minimum length is 6.'],
        validate: [isValid, 'Password must contain characters and numbers.'],
        trim: true
    },
    permissions: [String]
});

// hash password
userSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// login
userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({ email });
    
    if (user) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            return user;
        }
        throw Error('incorrect password');
    }
    throw Error('incorrect email');
}

// User
const User = mongoose.model('Users', userSchema);

// exports
module.exports =  { User, ROLES };