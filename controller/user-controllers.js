const User = require('../models/Users,js');

// handele errors
const handleErrors = (err) => {
    const errors = {
        username: '',
        email: '',
        password: ''
    };

    // email duplicated
    if (err.code === 11000) {
        return errors.email = 'Email has been registered.'
    };
    console.log(err.code, err.keyPattern);

    // validation
    if (err.message.includes('Users validation failed')) {
        Object.values(err.errors).forEach(({ properties}) => {
            errors[properties.path] = properties.message;
        })
        return errors;
    };
};

// routes
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
    const { username, email, password, password1 } = req.body;
    
    // confirm password
    if (password !== password1) {
        res.status(400).json({
            password1: 'password not match.'
        });
    } else {

    // try to create an account 
        try {
            const user = await User.create({
                email,
                username,
                password
            });
            res.status(201).json(user);
        } catch (err) {
            console.log(err)
            const errors = handleErrors(err);
            res.status(400).json(errors);
        };
    }
};

