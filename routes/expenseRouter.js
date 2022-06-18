var express = require('express');
var controller = require('../components/expense')

var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

//Add Expense router
router.post('/v1/add', controller.addExpense)

//Edit group router 
router.post('/v1/editExpense', controller.editExpense)

//Delte group router
router.delete('/v1/deleteExpense', controller.deleteExpense)

//View Individual expense router
router.post('/v1/viewExpense', controller.viewExpense)

//View group expense router
router.post('/v1/groupExpense', controller.viewGroupExpense)

//View user expense router 
router.post('/v1/userExpense', controller.viewUserExpense)

module.exports = router;