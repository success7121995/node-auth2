const express = require('express');
const productControllers = require('../controllers/product-controllers');
const auth = require('../middlewares/auth');

// init router
const productRouter = express.Router();

// routes
productRouter.get('/', auth.isAuth, productControllers.viewProducts_get);

// exports
module.exports = productRouter;