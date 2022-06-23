import axios from 'axios'


const API = axios.create({ baseURL: 'http://localhost:3001'})

export const loginIn = (formData) => API.post('/users/v1/login', formData)

export const register = (formData) => API.post('/users/v1/register', formData)

export const deleteUser = (formData) => API.delete('/users/v1/delete', {data:formData})

export const updatePassword = (formData) =>API.post('/users/v1/updatePassword', formData)

export const getUser = (formData) => API.post('/users/v1/view', formData)
