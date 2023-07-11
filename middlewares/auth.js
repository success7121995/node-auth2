const User = require('../models/User');

// not allow to access if the user is unauthorized.
module.exports.isAuth = (req, res, next) => {
    const user = req.session.user;
    const directUrl = req.originalUrl;

    if (!user) {
        res.cookie('directUrl', directUrl, { maxAge: 1000 * 24 * 60 * 60 });
        res.redirect('/users/login');
    } else {
        next();
    };
};

// check the user and show the username on the dashboard
module.exports.checkUser = (req, res, next) => {
    const user = req.session.user;

    if (!user) {
        res.locals.user = null;
        next();
    } else {
        console.log(user);
        res.locals.user = user;
        next();
    };
};

// access control
module.exports.isAdmin = (req, res, next) => {
    const user = req.session.user;
    if (user) {
        const role = user.permission;
        if (role === 'ADMIN') {   
            next();
        } else {
            res.status(403).send('Not allow to do this action.')
        };
    };
};