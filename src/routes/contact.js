const express = require('express');
const route = express.Router();
const { contact } = require('../controller/contact')

route.get('/', contact)

module.exports = route