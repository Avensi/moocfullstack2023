import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const fetchPersons = () => {
    const req = axios.get("http://localhost:3001/persons")
    return req.then(response => response.data)
}

const createPerson = (person) => {
    const req = axios.post("http://localhost:3001/persons", person)
    return req.then(response => response.data)
}

export default { fetchPersons, createPerson }