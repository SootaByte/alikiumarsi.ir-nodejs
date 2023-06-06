const express = require('express');
const router = express.Router();

const registerController = require('./../../http/controllers/auth/registerController');

router.get('/register', registerController.showForm)

router.post('/register', registerController.registerProcess)

module.exports = router