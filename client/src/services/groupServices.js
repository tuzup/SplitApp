import * as api from '../api/index'

export const getUserGroupsService = async (data) =>{
    try{
        const userGroups = await api.getUserGroups(data)
        return userGroups
    }catch(err){
        return false
    }
}