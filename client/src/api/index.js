import axios from 'axios'


//const API = axios.create({ baseURL: 'http://localhost:3001'})
const API = axios.create({ baseURL: ''})

const profile = JSON.parse(localStorage.getItem('profile'))

const accessHeader = {
    headers: {
      'Authorization': `token ${profile ? profile.accessToken : null}`
    }
  }

export const loginIn = (formData) => API.post('/api/users/v1/login', formData)

export const register = (formData) => API.post('/api/users/v1/register', formData)

export const deleteUser = (formData) => API.delete('/api/users/v1/delete', {headers:accessHeader.headers,data:formData})

export const updatePassword = (formData) =>API.post('/api/users/v1/updatePassword', formData, accessHeader)

export const getUser = (formData) => API.post('/api/users/v1/view', formData, accessHeader)

export const editUser = (formData) => API.post('/api/users/v1/edit', formData, accessHeader)

export const getUserGroups = (formData) => API.post('/api/group/v1/user', formData, accessHeader)

export const getEmailList = () => API.get('/api/users/v1/emailList', accessHeader)

export const createGroup = (formData) => API.post('/api/group/v1/add', formData,  accessHeader)

export const editGroup = (formData) => API.post('/api/group/v1/edit', formData, accessHeader)

export const getGroupDetails = (formData) => API.post('/api/group/v1/view', formData, accessHeader)

export const getGroupExpense = (formData) => API.post('/api/expense/v1/group', formData, accessHeader)

export const addExpense = (formDate) => API.post('/api/expense/v1/add', formDate, accessHeader)

export const editExpense = (formDate) => API.post('/api/expense/v1/edit', formDate, accessHeader)

export const deleteExpense = (formData) => API.delete('/api/expense/v1/delete', {headers:accessHeader.headers,data:formData})

export const getGroupCategoryExp = (formData) => API.post('/api/expense/v1/group/categoryExp', formData, accessHeader)

export const getGroupMonthlyExp = (formData) => API.post('/api/expense/v1/group/monthlyExp', formData, accessHeader)

export const getGroupDailyExp = (formData) => API.post('/api/expense/v1/group/dailyExp', formData, accessHeader)

export const getUserExpense = (formData) => API.post('/api/expense/v1/user', formData, accessHeader)

export const getUserMonthlyExp = (formData) => API.post('/api/expense/v1/user/monthlyExp', formData, accessHeader)

export const getUserDailyExp = (formData) => API.post('/api/expense/v1/user/dailyExp', formData, accessHeader)

export const getUserCategoryExp = (formData) => API.post('/api/expense/v1/user/categoryExp', formData, accessHeader)

export const getRecentUserExp = (formData) => API.post('/api/expense/v1/user/recent', formData, accessHeader)

export const getExpDetails = (formData) => API.post('/api/expense/v1/view', formData, accessHeader)

export const getSettle = (formData) => API.post('/api/group/v1/settlement', formData, accessHeader)

export const makeSettle = (formData) => API.post('/api/group/v1/makeSettlement', formData, accessHeader)