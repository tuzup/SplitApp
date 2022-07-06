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


export const getUserExpenseService = async(data, setAlert, setAlertMessage) => {
     try{
         const expense_details = await api.getUserExpense(data)
         return expense_details
     }catch(err){
         setAlert(true)
         err.response.status === 400 || err.response.status === 401
         ? setAlertMessage(err.response.data.message) : setAlertMessage("Oops! Something went worng")
         return false
     }
 }


 export const getUserMonthlyExpService = async (data, setAlert, setAlertMessage) => {
     try{
          return await api.getUserMonthlyExp(data)

     }catch(err){
        setAlert(true)
        err.response.status === 400 || err.response.status === 401
        ? setAlertMessage(err.response.data.message) : setAlertMessage("Oops! Something went worng")
        return false
   }
}


export const getUserDailyExpService = async (data, setAlert, setAlertMessage) => {
     try{
          return await api.getUserDailyExp(data)

     }catch(err){
        setAlert(true)
        err.response.status === 400 || err.response.status === 401
        ? setAlertMessage(err.response.data.message) : setAlertMessage("Oops! Something went worng")
        return false
   }
}


export const getUserCategoryExpService = async (data, setAlert, setAlertMessage) => {
     try{
          return await api.getUserCategoryExp(data)

     }catch(err){
        setAlert(true)
        err.response.status === 400 || err.response.status === 401
        ? setAlertMessage(err.response.data.message) : setAlertMessage("Oops! Something went worng")
        return false
   }
}


export const getRecentUserExpService = async (data, setAlert, setAlertMessage) => {
     try{
          return await api.getRecentUserExp(data)
     }catch(err){
          setAlert(true)
          err.response.status === 400 || err.response.status === 401
          ? setAlertMessage(err.response.data.message) : setAlertMessage("Oops! Something went worng")
          return false
     }
}

export const getExpDetailsService = async (data, setAlert, setAlertMessage) => {
     try{
          return await api.getExpDetails(data)
     }catch(err){
          setAlert(true)
          err.response.status === 400 || err.response.status === 401
          ? setAlertMessage(err.response.data.message) : setAlertMessage("Oops! Something went worng")
          return false
     }
}


export const editExpenseService = async (data,setAlert, setAlertMessage) => {
     try{
          const edit_exp_response = await api.editExpense(data)
          return edit_exp_response
     }catch(err){
          setAlert(true)
          err.response.status === 400 || err.response.status === 401
          ? setAlertMessage(err.response.data.message) : setAlertMessage("Oops! Something went worng")
          return false
     }
  }

  export const deleteExpenseService = async (data,setAlert, setAlertMessage) => {
     try{
          const delete_exp_response = await api.deleteExpense(data)
          return delete_exp_response
     }catch(err){
          setAlert(true)
          err.response.status === 400 || err.response.status === 401
          ? setAlertMessage(err.response.data.message) : setAlertMessage("Oops! Something went worng")
          return false
     }
  }