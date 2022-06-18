const model = require('../model/schema')
const validator = require('../helper/validation')

/*
Add Expense function
This function is used to add expense to the group 
Accepts: Group ID not null group ID exist in the DB
         Expense Name - Not Null
         Expense Desc - max 100 limit
         Expense Amount not null
         Expense Owner - not null --member in the Group Expense Members not null members in the Group
         Auto-Generate Expense ID - Auto generated and stored in the database
*/

exports.addExpense = async (req, res) => {
    try {
        var expense = req.body;
        var group = await model.Group.findOne({
            _id: expense.groupId
        })
        if (!group) {
            var err = new Error("Invalid Group Id")
            err.status = 400
            throw err
        }
        if (validator.notNull(expense.expenseName) &&
            validator.notNull(expense.expenseAmount) &&
            validator.notNull(expense.expenseOwner) &&
            validator.notNull(expense.expenseMembers)) {
            var ownerValidation = await validator.groupUserValidation(expense.expenseOwner, expense.groupId)
            if (!ownerValidation) {
                var err = new Error("Please provide a valid group owner")
                err.status = 400
                throw err
            }
            for (var user of expense.expenseMembers) {

                var memberValidation = await validator.groupUserValidation(user, expense.groupId)
                if (!memberValidation) {
                    var err = new Error("Please ensure the members exixt in the group")
                    err.status = 400
                    throw err
                }
            }
            expense.expensePerMember = expense.expenseAmount / expense.expenseMembers.length
            var newExp = new model.Expense(expense)
            var newExpense = await model.Expense.create(newExp)
            res.status(200).json({
                status: "Success",
                message: "New expenses added",
                Id: newExpense._id
            })
        }
    } catch (err) {
        res.status(err.status || 500).json({
            message: err.message
        })
    }
}

/*
Edit Expense function
This function is used to edit the previously added expense to the group
Accepts: Group ID not null group ID exist in the DB 
         Expense ID not null expense ID exist in the DB for the perticular group
         Expense Name Not Null
         Expense Desc max 100 limit Expense Amount not null
         Expense Owner - not null --member in the DB
         Expense Members not null members in the DB
*/
exports.editExpense = async (req, res) => {
    try {
        var expenseIdCheck = await model.Expense.findOne({
            _id: req.body.id
        })
        if (!expenseIdCheck) {
            var err = new Error("Invalid Expense Id")
            err.status = 400
            throw err
        }
        var expense = req.body
        if (validator.notNull(expense.expenseName) &&
            validator.notNull(expense.expenseAmount) &&
            validator.notNull(expense.expenseOwner) &&
            validator.notNull(expense.expenseMembers)) {
            var ownerValidation = await validator.groupUserValidation(expense.expenseOwner, expense.groupId)
            if (!ownerValidation) {
                var err = new Error("Please provide a valid group owner")
                err.status = 400
                throw err
            }
            for (var user of expense.expenseMembers) {
                var memberValidation = await validator.groupUserValidation(user, expense.groupId)
                if (!memberValidation) {
                    var err = new Error("Please ensure the members exixt in the group")
                    err.status = 400
                    throw err
                }
            }
            var expenseUpdate = await model.Expense.updateOne({
                id: req.body.id

            }, {
                $set: {
                    groupId: expense.groupId,
                    expenseName: expense.expenseName,
                    expenseDescription: expense.expenseDescription,
                    expenseAmount: expense.expenseAmount,
                    expenseOwner: expense.expenseOwner,
                    expenseMembers: expense,
                    expenseMembers,
                    expensePerMember: expense.expenseAmount / expense.expenseMembers.length

                }
            })
            res.status(200).json({
                status: "Success",
                message: "Expense Edited",
                response: expenseUpdate
            })
        }
    } catch (err) {
        res.status(err.status || 500).json({
            message: err.message
        })
    }
}

/*
Delete Expense function
This function is used to deted the expense added to the group
Accepts: Group ID not null group ID exist in the DB 
         Expense ID not null expense ID exist in the DB for the perticular group
*/
exports.deleteExpense = async (req, res) => {
    try {
        var expense = await model.Expense.findOne({
            _id: req.body.expenseId
        })
        if (!expense) {
            var err = new Error("Invalid Expense Id")
            err.status = 400
            throw err
        }
        var deleteExp = await model.Expense.deleteOne({
            id: req.body.expenseId
        })
        res.status(200).json({
            status: "Success",
            message: "Expense is deleted",
            response: deleteExp
        })
    } catch (err) {
        res.status(err.status || 500).json({
            message: err.message
        })
    }
}


/*
View Individual Expense
This function is used to view individual expenses based on the expense ID 
Accepts: Expense Id
Returns: Json with the expense details
*/

exports.viewExpense = async (req, res) => {
    try {
        var expense = await model.Expense.find({
            id: req.body.id
        })
        if (expense.length == 0) {
            var err = new Error("No expense present for the Id")
            err.status = 400
            throw err
        }
        res.status(200).json({
            status: "Success",
            expense: expense
        })
    } catch (err) {
        res.status(err.status || 500).json({
            message: err.message
        })
    }
}

/*
View Group Expense function
This function is used to view all the group expense
Accepts: Group Id
Returns: Json with all the expense record and the total expense amount for the group
*/
exports.viewGroupExpense = async (req, res) => {
    try {
        var groupExpense = await model.Expense.find({
            groupId: req.body.groupId
        })
        if (groupExpense.length == 0) {
            var err = new Error("No expense present for the group")
            err.status = 400
            throw err
        }
        var totalAmount = 0
        for (var expense of groupExpense) {
            totalAmount += expense['expenseAmount']
        }
        res.status(200).json({
            status: "Success",
            expense: groupExpense,
            total: totalAmount
        })
    } catch (err) {
        res.status(err.status || 500).json({
            message: err.message
        })
    }
}


/*
User Expense function
This function is used to find all the expense a user is involved in
Accepts user email Id
returns: Expenses
*/
exports.viewUserExpense = async (req, res) => {
    try {
        var userExpense = await model.Expense.find({
            expenseMembers: req.body.user
        })
        if (userExpense.length == 0) {
            var err = new Error("No expense present for the user")
            err.status = 400
            throw err
        }
        var totalAmount = 0
        for (var expense of userExpense) {
            totalAmount += expense['expensePerMember']
        }
        res.status(200).json({
            status: "Success",
            expense: userExpense,
            total: totalAmount
        })

    } catch (err) {
        res.status(err.status || 500).json({
            message: err.message
        })
    }
}