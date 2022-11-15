import axios from 'axios'

//const base_url = 'http://localhost:3001/api/login/'
const base_url = '/api/login/'

const post = (credentials) =>{
    const request = axios.post(base_url,credentials)
    return request.then(res=>res.data)
}

export default {post}