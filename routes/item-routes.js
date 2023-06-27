const express = require('express');
const itemControllers = require('../controllers/item-controllers');

// init router
const router = express.Router();

// route
// login page
router.get('/smoothies', itemControllers.items_get);

// exports
module.exports = router;