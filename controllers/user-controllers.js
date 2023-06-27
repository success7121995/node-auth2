const User = require('../models/user-models');
const jwt = require('jsonwebtoken');

// handle error
const handleErrors = (err) => {
    const errors = {
        username: '',
        email: '',
        password: '',
    };

    // duplicate
    if (err.code === 11000) {
        return errors.email = 'Email has been registered.'
    };

    // validator
    if (err.message.includes('Users validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
        return errors;
    };
};

// jwt
const maxAge = 1000 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, 'Fabulous', { expiresIn: maxAge });
}

// login page
module.exports.login_get = (req, res) => {
    res.render('login');
};

// signup page
module.exports.signup_get = (req, res) => {
    res.render('signup');
};

// login
module.exports.login_post = (req, res) => {
    res.send('login');
}

// signup
module.exports.signup_post = async (req, res) => {
    const { username, email, password } = req.body;

    try {     
        const user = await User.create({ username, email, password })
        const token = createToken(user._id);
        res.cookie('user', token, {
            httpOnly: true,
            maxAge: maxAge * 3
        });
        res.status(201).json(user._id);
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json(errors);
    };
};



