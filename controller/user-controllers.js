const User = require('../models/Users,js');

// handele errors
const handleErrors = (err) => {
    const errors = {
        username: '',
        email: '',
        password: ''
    };

    // email duplicated
    if (err.code === 11000 && { email: 1}) {
        return errors.email = 'Email has been registered.'
    };

    // validation
    if (err.message.includes('Users validation failed')) {
        Object.values(err.errors).forEach(({ properties}) => {
            errors[properties.path] = properties.message;
        })
        return errors;
    };
};

// go to login page
module.exports.login_get = (req, res) => {
    res.render('login');
};

// go to sign up page
module.exports.signup_get = async (req, res) => {
    res.render('signup');
};

// user login
module.exports.login_post = (req, res) => {
    res.send('user login');
};

// user sign up
module.exports.signup_post = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const user = await User.create({
            username,
            email,
            password
        });
        res.status(201).json(user);
    } catch (err) {
        const errors = handleErrors(err);
        console.log(err);
        res.status(400).json(errors);
    };
};