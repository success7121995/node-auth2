const express = require('express');
const UserControllers = require('../controllers/user-controllers');

// init router
const userRouter = express.Router();

// routes

// login page
userRouter.get('/login', UserControllers.login_get);

// sign up page
userRouter.get('/signup', UserControllers.signup_get);

// login
userRouter.post('/login', UserControllers.login_post);

// sign up
userRouter.post('/signup', UserControllers.signup_post);

// logout
userRouter.post('/logout', UserControllers.logout_get);

// exports
module.exports = userRouter;