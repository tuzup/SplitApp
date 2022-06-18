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
router.post('/v1/edit', controller.editExpense)

//Delte group router
router.delete('/v1/delete', controller.deleteExpense)

//View Individual expense router
router.post('/v1/view', controller.viewExpense)

//View group expense router
router.post('/v1/group', controller.viewGroupExpense)

//View user expense router 
router.post('/v1/user', controller.viewUserExpense)

//View user recent expense router
router.post('/v1/user/recent', controller.recentUserExpenses)


module.exports = router;