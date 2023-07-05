require('dotenv').config();
const User = require('../models/user-models');
const jwt = require('jsonwebtoken');

// handle errors
const handleErrors = (err) => {
    let errors = {
        username: '',
        email: '',
        password: '' 
    };

    // duplicate email
    if (err.code === 11000) {
        errors.email = 'The email is registered.'
        return errors;
    };

    // validation
    if (err.message.includes('Users validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
        return errors;
    };

    // login
    if (err.message === 'incorrect email') {
        errors.email = 'Incorrect email.';
        return errors;
    };

    if (err.message === 'incorrect password') {
        errors.password = 'Incorrect password.';
        return errors;
    };
};

// jwt
const maxAge = 1000 * 60 * 60 * 24;
const createToken = (id) => {
    return jwt.sign({ id }, process.env.USER_TOKEN, { expiresIn: maxAge});
};

// login page
module.exports.login_get = (req, res) => {
    res.render('login');
};

// signup page
module.exports.signup_get = (req, res) => {
    res.render('signup');
};

// login
module.exports.login_post = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);
        const token = createToken(user.id);
        res.cookie('jwt', process.env.USER_TOKEN, {
            httpOnly: true,
            secure: true,
            maxAge: maxAge * 3
        });
        res.status(200).json({ user })
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    };
};

// sign up
module.exports.signup_post = async (req, res) => {
    const { username, email, password } = req.body;
    
    // create an user
    try {
        const user = await User.create({ username, email, password});
        const token = createToken(user._id);
        res.cookie('jwt', token, {
            httpOnly: true,
            secure: true,
            maxAge: maxAge * 3
        });
        res.status(201).json({ user });
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    };
};

// logout
module.exports.logout_get = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1});
    res.redirect('/users');
};