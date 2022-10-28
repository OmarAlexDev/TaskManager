import axios from 'axios'

//const base_url = "http://localhost:3001/api/tasks"
const base_url = "/api/tasks"

const get =()=>{
    const request = axios.get(base_url)
    return request.then((res)=>res.data)
}
const post = (newTask)=>{
    const request = axios.post(base_url,newTask)
    return request.then(res=>res.data)
}
const remove = (id) =>{
    const request = axios.delete(`${base_url}/${id}`)
    return request.then((res)=>{
        console.log(res.data)
    })
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
    update
}