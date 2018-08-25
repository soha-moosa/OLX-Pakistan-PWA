const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const controller = require('./userController');

router.post('/signup', controller.signup);
router.post('/login', controller.login);
router.delete('/:id', controller.deleteUser);


module.exports = router;
