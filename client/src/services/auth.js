import * as api from '../api/index'

export const login = async (formData, setShowAlert, setAlertMessage) => {
    try{
        const  {data}  = await api.loginIn(formData)
        localStorage.setItem("profile", JSON.stringify(data))
        window.location.href="/dashboard"
        return data
    }catch(err){
        setShowAlert(true)
        console.log(err)
        err.response.status === 400 ? setAlertMessage(err.response.data.message) : setAlertMessage("Oops! Something went worng")
        return false
    }
}

export const register = async (formData, setShowAlert, setAlertMessage) => {
    try{
        //registering user to the DB
        const {data} = await api.register(formData)
        login(formData, setShowAlert, setAlertMessage)
        return data
    }catch(err){
        setShowAlert(true)
        err.response.status === 400 ? setAlertMessage(err.response.data.message) : setAlertMessage("Oops! Something went worng")
        console.log(err.response.status)
        return false
    }
}