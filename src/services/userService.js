import axios from 'axios'

const base_url = 'http://localhost:3001/api/users'
//const base_url = '/api/users'

const post = (newUser) =>{
    const request = axios.post(base_url,newUser)
    return request.then(res=>res.data)
}

export default {post}