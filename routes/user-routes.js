const express = require('express');
const userControllers = require('../controller/user-controllers');

// init router
const router = express.Router();

// routes
// go to login page
router.get('/login', userControllers.login_get);

// user login
router.post('/login', userControllers.login_post);

// go to sign up page
router.get('/signup', userControllers.signup_get);

// user sign up
router.post('/signup', userControllers.signup_post);

// exports
module.exports = router;