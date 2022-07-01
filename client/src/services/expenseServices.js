import * as api from '../api/index'


export const addExpenseService = async (data,setAlert, setAlertMessage) => {
   try{
        const add_exp_response = await api.addExpense(data)
        return add_exp_response
   }catch(err){
        setAlert(true)
        err.response.status === 400 || err.response.status === 401
        ? setAlertMessage(err.response.data.message) : setAlertMessage("Oops! Something went worng")
        return false
   }
}

export const getGroupCategoryExpService = async (data, setAlert, setAlertMessage) => {
     try{
          return await api.getGroupCategoryExp(data)

     }catch(err){
        setAlert(true)
        err.response.status === 400 || err.response.status === 401
        ? setAlertMessage(err.response.data.message) : setAlertMessage("Oops! Something went worng")
        return false
   }
}
export const getGroupMonthlyExpService = async (data, setAlert, setAlertMessage) => {
     try{
          return await api.getGroupMonthlyExp(data)

     }catch(err){
        setAlert(true)
        err.response.status === 400 || err.response.status === 401
        ? setAlertMessage(err.response.data.message) : setAlertMessage("Oops! Something went worng")
        return false
   }
}


export const getGroupDailyExpService = async (data, setAlert, setAlertMessage) => {
     try{
          return await api.getGroupDailyExp(data)

     }catch(err){
        setAlert(true)
        err.response.status === 400 || err.response.status === 401
        ? setAlertMessage(err.response.data.message) : setAlertMessage("Oops! Something went worng")
        return false
   }
}

