const express = require('express');
const userControllers = require('../controllers/user-controllers');

// init router
const userRouter = express.Router();

// routes
// go to login page
userRouter.get('/login', userControllers.login_get);

// go to signup page
userRouter.get('/signup', userControllers.signup_get);

// login
userRouter.post('/login', userControllers.login_post);

// signup
userRouter.post('/signup', userControllers.signup_post);

// exports
module.exports = userRouter;