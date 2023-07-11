const User = require('../models/User');

// handle error
const handleErr = (err) => {
    const errors = {
        username: '',
        email: '',
        password: '',
    };

    // duplicate
    if (err.code === 11000) {
        errors.email = 'Email is registered.';
        return errors;
    };

    // validator
    if (err.message.includes('Users validation   failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
        return errors;
    };

    // login wrong email
    if (err.message === 'incorrect email') {
        errors.email = 'Incorrect email.';
        return errors;
    };

    // login wrong password
    if (err.message === 'incorrect password') {
        errors.password = 'Incorrect password.';
        return errors;
    };
};

// go to login page
module.exports.login_get = (req, res) => {
    res.render('login');
};

// go to signup page
module.exports.signup_get = (req, res) => {
    res.render('signup');
};

// login
module.exports.login_post = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.login(email, password);
        req.session.user = user;
        const directUrl = req.cookies.directUrl;
        if (directUrl !== null) {
            res.cookie('directUrl', directUrl, { maxAge: 1 }); // delete after login
            res.status(200).json({ user, directUrl });
        } else {
            res.status(200).json({ user });
        };
    } catch (err) {
        const errors = handleErr(err);
        res.status(400).json({ errors });
    };
};

// signup
module.exports.signup_post = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const user =  await User.create({ username, email, password });
        req.session.user = user;
        res.status(201).json({ user });
    } catch (err) {
        const errors = handleErr(err);
        res.status(400).json({ errors });
    };
};