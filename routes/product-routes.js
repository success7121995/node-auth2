const express = require('express');
const productControllers = require('../controllers/product-controllers');
const auth = require('../middlewares/auth');
const upload = require('../middlewares/upload');

// init router
const productRouter = express.Router();

// routes
// go to view products
productRouter.get('/', auth.isAuth, productControllers.viewProducts_get);

// go to upload page
productRouter.get('/upload', auth.isAdmin, productControllers.upload_get);

// store products to db
productRouter.post('/upload', auth.isAdmin, upload.uploadImg, productControllers.upload_post);

// exports
module.exports = productRouter;