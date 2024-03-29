import axios from "axios"
const baseUrl = "/api/blogs"

let token = null

const setToken = newToken => {
    token = `Bearer ${newToken}`
}

const create = async newObject => {
    const config = {
        headers: { Authorization: token },
    }

    const response = await axios.post(baseUrl, newObject, config)
    return response.data
}

const put = async (updateObjectId, updateObject) => {
    const config = {
        headers: { Authorization: token },
    }
    const response = await axios.put(`${baseUrl}/${updateObjectId}`, updateObject, config)
    return response.data
}

const remove = async(objectId) => {
    const config = {
        headers: { Authorization: token },
    }
    const response = await axios.delete(`${baseUrl}/${objectId}`, config)
    return response.data
}

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}


export default { getAll, create, setToken, put, remove }