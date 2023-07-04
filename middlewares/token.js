const jwt = require('jsonwebtoken');

const maxAge = 1000 * 60 * 60 * 24;
const createToken = (id) => {
    return jwt.sign({id}, 'user', {
        expiresIn: maxAge
    });
};

