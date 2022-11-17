import axios from 'axios'

//const base_url = "http://localhost:3001/api/tasks"
const base_url = "/api/tasks"

let token = null

const setToken= (tkn)=>{
    token =  `bearer ${tkn}`
}

const get =()=>{
    const request = axios.get(base_url)
    return request.then((res)=>res.data)
}
const post = (newTask)=>{
    const config = {headers: {Authorization: token}}
    const request = axios.post(base_url,newTask,config)
    return request.then(res=>res.data)
}
const remove = (id) =>{
    const config = {headers: {Authorization: token}}
    const request = axios.delete(`${base_url}/${id}`,config)
    return request.then((res)=>res.data)
}
const update = (id,newTask) =>{
    const request = axios.put(`${base_url}/${id}`,newTask)
    return request.then((res)=>{
        console.log(res.data)
    })
}

export default {
    get,
    post,
    remove,
    update,
    setToken
}