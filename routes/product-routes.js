const express = require('express');
const productControllers = require('../controllers/product-controllers');
const auth = require('../middlewares/auth');

// init router
const productRouter = express.Router();

// routes
// go to view products
productRouter.get('/', productControllers.viewProducts_get);

// store products to db
productRouter.post('/upload-product', productControllers.uploadProduct_post);

// exports
module.exports = productRouter;