
// not allow to access if the user is unauthorized.
module.exports.isAuth = (req, res, next) => {
    const directUrl = req.originalUrl;
    console.log(req.session.user);
    if (!req.session.user) {
        res.cookie('directUrl', directUrl, { maxAge: 1000 * 24 * 60 * 60 });
        res.cookie('newUser', true);
        res.redirect('/users/login');
    } else {
        next();
    };
};


// user in homepage, redirect to homepa