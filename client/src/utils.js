import axios from 'axios'
import cookie from 'react-cookies'

const BASEURL = "http://localhost:5000/api"

export const loginUser = (dataObj) => {
   return axios.post(`${BASEURL}/user/login`, dataObj)
    .then(res=>{
        const { data } = res
        if(data.status){
            cookie.save('token', data.token, { path: '/', maxAge: 1800 })
            cookie.save('userId', data.user.id, { path: '/', maxAge: 1800 })
            return { status: true }
        }else{
            return { status: false, msg : 'Invalid credentials!' }
        }
    })
    .catch((err) => { 
        return { status: false, msg : 'Invalid credentials!' }
    })
}

export const registerUser = (dataObj) => {
    return axios.post(`${BASEURL}/user/register`, dataObj)
     .then(res=>{
         const { data } = res
         cookie.save('token', data.token, { path: '/', maxAge: 1800 })
         cookie.save('userId', data.user.id, { path: '/', maxAge: 1800 })
         return { status: true }
     })
     .catch((err) => { 
         return { status: false, msg : 'Email Already exists!' }
     })
 }

export const logoutUser = () => {
    cookie.remove('token', { path: '/' })
    cookie.remove('userId', { path: '/' })
    return { status: true, msg: 'User logged out!' }
}

export const addTask = (title) => {
    const config = {
        headers: { Authorization: `Bearer ${cookie.load('token')}` }
    };
    const dataObj = {
        title,
        status: 1,
        user_id: cookie.load('userId')
    }
    return axios.post(`${BASEURL}/user/addtask`, dataObj, config)
     .then(res=>{
         return { status: true }
     })
     .catch((err) => { 
         return { status: false, msg : 'Something went wrong!' }
     })
}

export const getTaskList = () => {

    const config = {
        headers: { Authorization: `Bearer ${cookie.load('token')}` }
    };
    const dataObj = { user_id: cookie.load('userId') }
    return axios.post(`${BASEURL}/user/getalltask`, dataObj, config)
    .then(res=>{
        return { status: true, data: res.data }
    })
    .catch((err) => { 
        return { status: false, msg : 'Something went wrong!' }
    })
}

export const changeStatus = (dataObj) => {
    const config = {
        headers: { Authorization: `Bearer ${cookie.load('token')}` }
    };
    return axios.post(`${BASEURL}/user/changestatus`, dataObj, config)
    .then(res=>{
        return { status: true }
    })
    .catch((err) => { 
        return { status: false, msg : 'Something went wrong!' }
    })
}

export const updateTask = (dataObj) => {
    const config = {
        headers: { Authorization: `Bearer ${cookie.load('token')}` }
    };
    dataObj.user_id = cookie.load('userId')
    return axios.post(`${BASEURL}/user/updatetask`, dataObj, config)
    .then(res=>{
        return { status: true }
    })
    .catch((err) => { 
        return { status: false, msg : 'Something went wrong!' }
    })
}

export const getTask = (id) => {
    const config = {
        headers: { Authorization: `Bearer ${cookie.load('token')}` }
    };
    return axios.post(`${BASEURL}/user/edittask`, {id, user_id: cookie.load('userId')},config)
    .then(res=>{
        return { status: true, data: res.data }
    })
    .catch((err) => { 
        return { status: false, msg : 'Something went wrong!' }
    })
}

export const deleteTask = (id) => {
    const config = {
        headers: { Authorization: `Bearer ${cookie.load('token')}` }
    };
    return axios.post(`${BASEURL}/user/delete`, {id, user_id: cookie.load('userId')}, config)
    .then(res=>{
        return { status: true }
    })
    .catch((err) => { 
        return { status: false, msg : 'Something went wrong!' }
    })
}

export const updateUser = (dataObj) => {
    const config = {
        headers: { Authorization: `Bearer ${cookie.load('token')}` }
    };
    dataObj.id = cookie.load('userId')
    return axios.post(`${BASEURL}/user/updateuser`, dataObj, config)
    .then(res=>{
        return { status: true }
    })
    .catch((err) => { 
        return { status: false, msg : 'Something went wrong!' }
    })
}

export const getProfile = () => {
    const config = {
        headers: { Authorization: `Bearer ${cookie.load('token')}` }
    };
    return axios.post(`${BASEURL}/user/getuser`, {id: cookie.load('userId')}, config)
    .then(res=>{
        return { status: true, data: res.data }
    })
    .catch((err) => { 
        return { status: false, msg : 'Something went wrong!' }
    })
}

export const isloggedIn = () => {
    const token = cookie.load('token')
    if(token == undefined || token == ''){
        return false
    }else{
        return true
    }
}