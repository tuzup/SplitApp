var express = require('express');
var controller = require('../components/user')

var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

//User Registeration router
router.post('/v1/register', controller.userReg)

//User Login router 
router.post('/v1/login', controller.userLogin)

module.exports = router;