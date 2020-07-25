const express = require('express');
const router = express.Router();
const { forwardAuthenticated } = require('../controller/config/auth');
const { index,signup,login,logout } = require('../controller/auth')

router.get('/', forwardAuthenticated, index);

router.post('/signup', signup);

router.post('/login', login);

router.get('/logout', logout);

module.exports = router;