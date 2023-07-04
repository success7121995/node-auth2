const jwt = require('jsonwebtoken');
const maxAge = 1000 * 24 * 60 * 60;

// user role
module.exports.userRole = (id) => {
    return jwt.sign({ id }, 'user role', { expiresIn: maxAge });
};