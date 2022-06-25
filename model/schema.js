var mongoose = require('mongoose')
var logger = require('../helper/logger')

mongoose.connect(process.env.MONGODB_URI, 
//     {
//     maxPoolSize: 50,
//     wtimeoutMS: 2500,
//     useNewUrlParser: true
// }
).then(() => {
    logger.info(`DB Connection Established`)
    console.log("DB Connected")
}).catch(err => {
    logger.error(`DB Connection Fail | ${err.stack}`)
    console.log(err)
})

const User = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    emailId: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

const Group = new mongoose.Schema({
    groupName: {
        type: String,
        required: true
    },
    groupDescription: {
        type: String
    },
    currencyType: {
        type: String,
        default: "INR"
    },
    groupOwner: {
        type: String,
        required: true
    },
    groupMembers: {
        type: Array,
        required: true
    },
    category: {
        type: String,
    },
    split: {
        type: Array
    }
})

const Expense = new mongoose.Schema({
    groupId: {
        type: String,
        required: true
    },
    expenseName: {
        type: String,
        required: true
    },
    expenseDescription: {
        type: String,
    },
    expenseAmount: {
        type: Number,
        required: true
    },
    expenseOwner: {
        type: String,
        required: true
    },
    expenseMembers: {
        type: Array,
        required: true
    },
    expensePerMember: {
        type: Number,
        required: true
    }
})

module.exports.Expense = mongoose.model('expense', Expense)
module.exports.User = mongoose.model('user', User)
module.exports.Group = mongoose.model('group', Group)