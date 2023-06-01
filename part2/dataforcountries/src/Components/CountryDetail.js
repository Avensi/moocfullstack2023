import WeatherService from "../Services/WeatherService"
import Weather from "./Weather"
import { useState, useEffect } from "react"

const CountryDetail = ({country}) => {

    const keys = Object.keys(country.languages)
    const [newWeather, setNewWeather] = useState(null)

    const getWeather = (country) => {
        WeatherService
        .getWeather(country)
        .then(fetchedWeather => {
            setNewWeather(fetchedWeather)
        })

    }

    useEffect(() => {
        getWeather(country)
    },[])

    return(
        <>
        <h1>{country.name.common}</h1>
        <p>capital {country.capital[0]}</p>
        <p>area {country.area}</p>

        <b>languages :</b>
        <ul>
            {
                keys.map(key => <li key={key}>{country.languages[key]}</li>)
            }
            
        </ul>
        <img src={country.flags.png}></img>
        <Weather weatherData={newWeather} country={country} />
        </>
    )
}

export default CountryDetail