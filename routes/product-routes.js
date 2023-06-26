const express = require('express');
const productControllers = require('../controller/product-controllers');

// init router
const router = express.Router();

// routes
// view products
router.get('/', productControllers.products_get);

// exports
module.exports = router;