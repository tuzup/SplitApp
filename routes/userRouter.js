var express = require('express');
var controller = require('../components/user')
var apiAuth = require('../helper/apiAuthentication')

var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

//User Registeration router
router.post('/v1/register', controller.userReg)

//User Login router 
router.post('/v1/login', controller.userLogin)

//View User router 
router.post('/v1/view', apiAuth.validateToken,controller.viewUser)

//Edit User router
router.post('/v1/edit', apiAuth.validateToken, controller.editUser)

//Delete User router 
router.delete('/v1/delete', apiAuth.validateToken,controller.deleteUser)

//Update Password router
router.post('/v1/updatePassword',apiAuth.validateToken, controller.updatePassword)

//Get all User Emalil Id 
router.get('/v1/emailList',apiAuth.validateToken, controller.emailList)

module.exports = router;