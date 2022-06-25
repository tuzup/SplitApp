import axios from 'axios'


//const API = axios.create({ baseURL: 'http://localhost:3001'})
const API = axios.create({ baseURL: 'http://192.168.1.104:3001'})

const profile = JSON.parse(localStorage.getItem('profile'))

const accessHeader = {
    headers: {
      'Authorization': `token ${profile ? profile.accessToken : null}`
    }
  }

export const loginIn = (formData) => API.post('/users/v1/login', formData)

export const register = (formData) => API.post('/users/v1/register', formData)

export const deleteUser = (formData) => API.delete('/users/v1/delete', {data:formData}, accessHeader)

export const updatePassword = (formData) =>API.post('/users/v1/updatePassword', formData, accessHeader)

export const getUser = (formData) => API.post('/users/v1/view', formData, accessHeader)

export const editUser = (formData) => API.post('/users/v1/edit', formData, accessHeader)

export const getUserGroups = (formData) => API.post('/group/v1/user', formData, accessHeader)