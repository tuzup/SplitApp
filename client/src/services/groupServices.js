import { appendOwnerState } from '@mui/base'
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


export const editGroupService = async (data, setAlert, setAlertMessage) => {
    try{
        const edit_response = await api.editGroup(data)
        return edit_response
    }catch(err){
        setAlert(true)
        err.response.status === 400 || err.response.status === 401
        ? setAlertMessage(err.response.data.message) : setAlertMessage("Oops! Something went worng")
        return false
    }
}

export const getGroupDetailsService = async(data, setAlert, setAlertMessage) =>{
    try{
        const group_details = await api.getGroupDetails(data)
        return group_details
    }catch(err){
        setAlert(true)
        err.response.status === 400 || err.response.status === 401
        ? setAlertMessage(err.response.data.message) : setAlertMessage("Oops! Something went worng")
        return false
    }
}

export const getGroupExpenseService = async(data, setAlert, setAlertMessage) => {
    try{
        const expense_details = await api.getGroupExpense(data)
        return expense_details
    }catch(err){
        setAlert(true)
        err.response.status === 400 || err.response.status === 401
        ? setAlertMessage(err.response.data.message) : setAlertMessage("Oops! Something went worng")
        return false
    }
}

export const getGroupSettleService = async(data, setAlert, setAlertMessage) => {
    try{
        const settle_details = await api.getSettle(data)
        return settle_details
    }catch(err){
        setAlert(true)
        err.response.status === 400 || err.response.status === 401
        ? setAlertMessage(err.response.data.message) : setAlertMessage("Oops! Something went worng")
        return false
    }
}

export const settlementService = async(data, setAlert, setAlertMessage) => {
    try{
        const settle_details = await api.makeSettle(data)
        return settle_details
    }catch(err){
        setAlert(true)
        err.response.status === 400 || err.response.status === 401
        ? setAlertMessage(err.response.data.message) : setAlertMessage("Oops! Something went worng")
        return false
    }
}