import axios from 'axios'

const API = axios.create({ baseURL: 'http://localhost:3001'})

export const loginIn = (formData) => API.post('/users/v1/login', formData)