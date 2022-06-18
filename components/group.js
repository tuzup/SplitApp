const model = require('../model/schema')
const validator = require('../helper/validation')

/*
Create Group Function This function basically create new groups
Accepts: Group Name
         Group Description:
         Group Members
         Currency Type:
Validation: Group Name not empty
            Group Members present in DB
            Currency type INR, USD, EUR (for now)
*/
exports.createGroup = async (req, res) => {
    try {
        var newGroup = new model.Group(req.body)
        //Performing validation on the input
        if (validator.notNull(newGroup.groupName) &&
            validator.currencyValidation(newGroup.currencyType)) {

            //Validating the group Members exist in the DB 
            for (var user of newGroup.groupMembers) {
                var memberCheck = await validator.userValidation(user)
                if (!memberCheck) {
                    var err = new Error('Invalid member id')
                    err.status = 400
                    throw err
                }
            }
            //Validating the group Owner exist in the DB 
            var ownerCheck = await validator.userValidation(newGroup.groupOwner)
            if (!ownerCheck) {
                var err = new Error('Invalid owner id')
                err.status = 400
                throw err
            }

            var id = await model.Group.create(newGroup)
            res.status(200).json({
                status: "Success",
                message: "Group Creation Success",
                Id: id._id
            })
        }
    } catch (err) {
        res.status(err.status || 500).json({
            message: err.message
        })
    }
}


/*
View Group function 
This function is used to display the group details 
Accepts: Group Id 
Returns: Group Info 
*/
exports.viewGroup = async(req,res) => {
    try{
        const group = await model.Group.findOne({_id: req.body.id})
        if(!group || req.body.id == null){
            var err = new Error('Invalid Group Id')
            err.status = 400
            throw err
        }
        res.status(200).json({
            status: "Success",
            group: group,
        })
    }catch{
        res.status(err.status || 500).json({
            message: err.message
        })
    }
}

/*
Find all user group function
This function is basically to display the list of group that a user belongs
Accepts: user email ID
Validation: email Id present in DB
*/
exports.findUserGroup = async (req, res) => {
    try {
        const user = await model.User.findOne({
            emailId: req.body.emailId
        })
        if (!user) {
            var err = new Error("User Id not found !")
            err.status = 400
            throw err
        }
        const groups = await model.Group.find({
            groupMembers: req.body.emailId
        })
        res.status(200).json({
            status: "Success",
            groups: groups
        })
    } catch (err) {
        res.status(err.status || 500).json({
            message: err.message
        })
    }
}

/*
Edit Group Function
This function is to edit the already existing group to make changes.
Accepts: Group Id
        Modified group info
*/
exports.editGroup = async (req, res) => {
    try {
        var group = await model.Group.findOne({
            _id: req.body.id
        })
        if (!group || req.body.id==null) {
            var err = new Error("Invalid Group Id")
            err.status = 400
            throw err
        }

        var editGroup = new model.Group(req.body)
        if (validator.notNull(editGroup.groupName) &&
            validator.currencyValidation(editGroup.currencyType)) {
            
            //Validation to check if the members exist in the DB 
            for (var user of editGroup.groupMembers) {
                var memberCheck = await validator.userValidation(user)
                if (!memberCheck) {
                    var err = new Error('Invalid member id')
                    err.status = 400
                    throw err
                }
            }
            var ownerCheck = await validator.userValidation(editGroup.groupOwner)
            if (!ownerCheck) {
                var err = new Error('Invalid owner id')
                err.status = 400
                throw err
            }
            var update_response = await model.Group.updateOne({
                _id: req.body.id
            }, {
                $set: {
                    groupName: editGroup.groupName,
                    groupDesciption: editGroup.groupDesciption,
                    currencyType: editGroup.currencyType,
                    groupMembers: editGroup.groupMembers
                }
            })
            res.status(200).json({
                status: "Success",
                message: "Group updated successfully!",
                response: update_response
            })
        }
    } catch (err) {
        res.status(err.status || 500).json({
            message: err.message
        })
    }
}

/*
Delete Group Function
This function is used to delete the existing group
Accepts: Group Id
Validation: exisitng group Id
*/
exports.deleteGroup = async (req, res) => {
    try {
        const group = await model.Group.findOne({
            _id: req.body.id
        })
        if (!group) {
            var err = new Error("Invalid Group Id")
            err.status = 400
            throw err
        }
        var delete_group = await model.Group.deleteOne({
            _id: req.body.id
        })
        res.status(200).json({
            message: "Group deleted successfully!",
            status: "Success",
            response: delete_group
        })

    } catch (err) {
        res.status(err.status || 500).json({
            message: err.message
        })
    }
}