import axios from "axios";

const api_key = process.env.REACT_APP_API_KEY

const getWeather = (country) => {
    const req = axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]},${country}&appid=${api_key}`)
    return req.then(response => response.data)

}

export default {getWeather}