const express = require('express');
const router = express.Router();

// controller
const registerController = require('./../../http/controllers/auth/registerController');

// validator
const registerValidator = require('./../../http/validator/registerValidator');

router.get('/register', registerController.showForm)

router.post('/register', registerValidator.handle(), registerController.registerProcess)

module.exports = router