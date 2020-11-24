const express = require('express');
const route = express.Router();
const { contact,sendMail } = require('../controller/contact');

route.get('/', contact)
route.post('/', sendMail);

module.exports = route