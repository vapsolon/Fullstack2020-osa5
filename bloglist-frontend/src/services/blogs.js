import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken =>{token = `bearer ${newToken}`}

const getAll = async() =>{
    const res = await axios.get(baseUrl)
    return res.data
}

const create = async newObject =>{
    console.log('aaa' + token)
    const config = {headers:{Authorization: token},}
    const res = await axios.post(baseUrl, newObject, config)
    return res.data
}

export default {getAll, create, setToken}