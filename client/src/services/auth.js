import * as api from '../api/index'

export const login = async (formData, setShowAlert, setAlertMessage) => {
    try{
        const  {data}  = await api.loginIn(formData)
        console.log("Login Success !")
        localStorage.setItem("profile", JSON.stringify(data))
        window.location.href="/dashboard"
        return data
    }catch(err){
        setShowAlert(true)
        setAlertMessage("Invalid Email ID or Password")
        return false
    }
}