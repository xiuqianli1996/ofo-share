var express = require('express');
var router = express.Router();
const users = require('./users')
const home = require('./home')

/* GET home page. */
router.use('/user', users)
router.use('/',home)

module.exports = router;
