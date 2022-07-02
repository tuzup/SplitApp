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

//Get group category expense router
router.post('/v1/group/categoryExp', controller.groupCategoryExpense)

//Get user category expense router
router.post('/v1/user/categoryExp', controller.userCategoryExpense)

//Get group monthly expense router 
router.post('/v1/group/monthlyExp', controller.groupMonthlyExpense)

//Get group daily expesnse router 
router.post('/v1/group/dailyExp', controller.groupDailyExpense)

//Get user monthly expense router 
router.post('/v1/user/monthlyExp', controller.userMonthlyExpense)

//Get user daily expense router 
router.post('/v1/user/dailyExp', controller.userDailyExpense)


module.exports = router;