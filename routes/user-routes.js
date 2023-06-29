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

// exports
module.exports = userRouter;