
// not allow to access if the user is unauthorized.
module.exports.isAuth = (req, res, next) => {
    if (req.session.user) {
        console.log(req.session.user);
        next();
    };
};