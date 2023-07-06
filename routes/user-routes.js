const express = require('express');

// init router
const userRouter = express.Router();

// routes
// go to login page
userRouter.get('/login');

// go to signup page
userRouter.get('/signup');

// login
userRouter.post('/login');

// signup
userRouter.post('/signup');

// exports
module.exports = userRouter;