const express = require('express');
const router = express.Router();

const HomeRoutes = require('./home');
const RegisterRoutes = require('./auth/register');

router.use('/', HomeRoutes);
router.use('/auth', RegisterRoutes);

module.exports = router