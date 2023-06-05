import axios from 'axios'
const baseUrl = '/api/persons'

const fetchPersons = () => {
    const req = axios.get(baseUrl)
    return req.then(response => response.data)
}

const createPerson = (person) => {
    const req = axios.post(baseUrl, person)
    return req.then(response => response.data)
}

const deletePerson = (personID) => {
    const req = axios.delete(`${baseUrl}/${personID}`)
    return req.then(response => response.data)
}

const putPerson = (personID, person) =>{
    const req = axios.put(`${baseUrl}/${personID}`, person)
    return req.then(response => response.data)
}
export default { fetchPersons, createPerson, deletePerson, putPerson }