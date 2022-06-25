import * as api from '../api/index'

export const getUserGroupsService = async (data) =>{
    try{
        const userGroups = await api.getUserGroups(data)
        return userGroups
    }catch(err){
        return false
    }
}

export const createGroupService = async (data, setAlert, setAlertMessage) => {
    try{
        const create_response = await api.createGroup(data)
        return create_response
    }catch(err){
        setAlert(true)
        err.response.status === 400 || err.response.status === 401
        ? setAlertMessage(err.response.data.message) : setAlertMessage("Oops! Something went worng")
        return false
    }
}