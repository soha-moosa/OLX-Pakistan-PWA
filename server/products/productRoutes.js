const express = require('express');
const router = express.Router();

const controller = require('./productController');

router.post('/addProduct', controller.addProduct);
router.get('/allProduct', controller.getAllProduct);
router.get('/search/:id', controller.searchProduct);
router.post('/category', controller.searchByCategory);
router.post('/searchByName', controller.searchByName);
module.exports = router;

