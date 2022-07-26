var express = require('express');
var controller = require('../components/group')

var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource')
})

//Add Group router
router.post('/v1/add', controller.createGroup)

//View Group router 
router.post('/v1/view', controller.viewGroup)

//View User groups router
router.post('/v1/user', controller.findUserGroup)

//Edit group router
router.post('/v1/edit', controller.editGroup)

//Settlement Calculator router 
router.post('/v1/settlement', controller.groupBalanceSheet)

//Make settlement router 
router.post('/v1/makeSettlement', controller.makeSettlement)

//Delte group router
router.delete('/v1/delete', controller.deleteGroup)

module.exports = router;