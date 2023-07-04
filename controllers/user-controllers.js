const User = require('../models/user-models');

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
module.exports.login_post = (req, res) => {
    res.send('user login');
};

// sign up
module.exports.signup_post = async (req, res) => {
    const { username, email, password } = req.body;
    
    // create an user
    try {
        const user = await User.create({ username, email, password});
        res.status(201).json({ user });
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    };
};
