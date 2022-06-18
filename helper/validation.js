const model = require('../model/schema')

exports.notNull = (value) => {
    if (value)
        return true
    else {
        var err = new Error("Please input the required field")
        err.status = 400
        throw err
    }
}

exports.emailValidation = (email) => {
    if (email && email.includes("@") && email.includes(".com"))
        return true
    else {
        var err = new Error("Email validation fail!!")
        err.status = 400
        throw err
    }
}

exports.passwordValidation = (pass) => {
    if (pass.search(/[a-z]/) >= 0 && pass.search(/[A-Z]/) >= 0 &&
        pass.search(/[0-9]/) >= 0 &&
        pass.search(/[!@#$%^&*()]/) >= 0 &&
        pass.length >= 8) {
        return true
    } else {
        var err = new Error("Password validation fail!!")
        err.status = 400
        throw err
    }
}

exports.currencyValidation = (currency) => {
    if (currency &&
        currency == "INR" ||
        currency == "USD" ||
        currency == "EUR") {
        return true
    } else {
        var err = new Error("Currency validation fail!!")
        err.status = 400
        throw err

    }
}

exports.userValidation = async (email) => {
    var user = await model.User.findOne({
        emailId: email
    })
    if (!user)
        return false
    else
        return true
}

exports.groupUserValidation = async (email, groupId) => {
    var groupMembers = await model.Group.findOne({
        id: groupId
    }, {
        groupMembers: 1,
        _id: 0
    })
    groupMembers = groupMembers['groupMembers']
    if (groupMembers.includes(email))
        return true
    else
        return false
}