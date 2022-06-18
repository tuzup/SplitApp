const model = require('../model/schema')
const bcrypt = require('bcryptjs')
const validator = require('../helper/validation')
const logger = require('../helper/logger')

/*
User Registeration function
Accepts: firstName, lastName, emailId, password 
Validation: firstname, lastname not Null 
            emailID - contain '@' and '.com' 
            password - min 8, lowecase, uppercase, special character, numbers
API: /users/v1/register
*/
exports.userReg = async (req, res) => {
    try {
        //Checking email Id exist in DB
        const user = await model.User.findOne({
            emailId: req.body.emailId
        })
        //If email ID present in database thows error and retuen message
        if (user) {
            const err = new Error("Email Id already present please login!")
            err.status = 400
            throw err
        } else {
            //Accepts the inputs and create user model form req.body
            var newUser = new model.User(req.body)
            //Performing validations
            if (validator.emailValidation(newUser.emailId) &&
                validator.passwordValidation(newUser.password) &&
                validator.notNull(newUser.firstName) &&
                validator.notNull(newUser.lastName)) {
                //Bcrypt password encription
                const salt = await bcrypt.genSalt(10);
                newUser.password = await bcrypt.hash(newUser.password, salt)

                //storing user details in DB
                var id = await model.User.create(newUser)
                res.status(200).json({
                    status: "Success",
                    message: "User Registeration Success",
                    userId: id.id
                })
            }
        }
    } catch (err) {
        logger.error(`URL : ${req.originalUrl} | staus : ${err.status} | message: ${err.message}`)
        res.status(err.status || 500).json({
            message: err.message
        })
    }
}

/*
User login function
Accepts: email Id & Pass
Implement Google Sign-in in the future.
*/
exports.userLogin = async (req, res) => {
    try {
        //Checking email Id exist in DB 
        const user = await model.User.findOne({
            emailId: req.body.emailId
        })
        if (!user) {
            var err = new Error("Invalid email Id or Password !")
            err.status = 400
            throw err
        }

        //validating password using bcrypt
        const validCred = await bcrypt.compare(req.body.password, user.password)
        if (!validCred) {
            var err = new Error("Invalid email Id or Password* !")
            err.status = 400
            throw err
        } else {
            res.status(200).json({
                status: "Success",
                message: "User Login Success",
                userId: user.id
            })
        }
    } catch (err) {
        logger.error(`URL : ${req.originalUrl} | staus : ${err.status} | message: ${err.message}`)
        res.status(err.status || 500).json({
            message: err.message
        })
    }
}

/*
View User function 
This function is to view the user details 
Accepts: user email Id 
Returns: user details (ensure password is removed)
*/
exports.viewUser = async(req, res) => {
    try{
        const user = await model.User.findOne({
            emailId: req.body.emailId
        },{password: 0})
        if (!user) {
            var err = new Error("User does not exist!")
            err.status = 400
            throw err
        }
        res.status(200).json({
            status: "Success",
            user: user
        })
    }catch(err){
        logger.error(`URL : ${req.originalUrl} | staus : ${err.status} | message: ${err.message}`)
        res.status(err.status || 500).json({
            message: err.message
        })
    }
}


/*
Delete User function 
This function is used to delete an existing user in the database 
Accepts: user email id 
*/
exports.deleteUser = async(req, res) => {
    try{
        const userCheck = await validator.userValidation(req.body.emailId)
        if(!userCheck){
            var err = new Error("User does not exist!")
            err.status = 400
            throw err
        }
        const delete_response = await model.User.deleteOne({emailId: req.body.emailId})
        res.status(200).json({
            status: "Success",
            response: delete_response
        })
    }catch(err){
        logger.error(`URL : ${req.originalUrl} | staus : ${err.status} | message: ${err.message}`)
        res.status(err.status || 500).json({
            message: err.message
        })
    }
}

/*
Edit User function 
This function is used to edit the user present in the database 
Accepts: User data (user email id can not be changed)
This function can not be used to change the password of the user 
*/
exports.editUser = async(req, res) => {
    try{
        const userCheck = await validator.userValidation(req.body.emailId)
        if(!userCheck){
            var err = new Error("User does not exist!")
            err.status = 400
            throw err
        }
        //Accepts the inputs and create user model form req.body
        var editUser = req.body
        //Performing validations
        if (validator.notNull(editUser.firstName) &&
            validator.notNull(editUser.lastName)) {
            //storing user details in DB
            var update_response = await model.User.updateOne({emailId: editUser.emailId}, {$set: {
                firstName: editUser.firstName, 
                lastName: editUser.lastName,
            }})
            res.status(200).json({
                status: "Success",
                message: "User update Success",
                userId: update_response
            })
        }
    }catch(err){
        logger.error(`URL : ${req.originalUrl} | staus : ${err.status} | message: ${err.message}`)
        res.status(err.status || 500).json({
            message: err.message
        })
    }
}