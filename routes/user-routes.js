const express = require('express');
const userControllers = require('../controllers/user-controllers');

// init router
const router = express.Router();

// route
// login page
router.get('/login', userControllers.login_get);

// signup page
router.get('/signup', userControllers.signup_get);

// login
router.post('/login', userControllers.login_post);

// signup
router.post('/signup', userControllers.signup_post);

// exports
module.exports = router;