import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const fetchPersons = () => {
    const req = axios.get(baseUrl)
    return req.then(response => response.data)
}

const createPerson = (person) => {
    const req = axios.post(baseUrl, person)
    return req.then(response => response.data)
}

export default { fetchPersons, createPerson }