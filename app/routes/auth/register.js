const express = require('express');
const router = express.Router();

router.get('/register', (req, res) => {
    res.render('home/auth/register');
})

router.post('/register', (req, res) => {
    res.json(req.body);
})

module.exports = router