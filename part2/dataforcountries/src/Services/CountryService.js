import axios from 'axios'

const baseURL='https://studies.cs.helsinki.fi/restcountries/api'

const fetchCountries = () => {
    const req = axios.get(`${baseURL}/all`)
    return req.then(response => response.data)
}

export default {fetchCountries}