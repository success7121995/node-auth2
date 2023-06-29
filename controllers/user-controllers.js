
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
module.exports.signup_post = (req, res) => {
    res.send('user signup');  
};
