const Weather = ({weatherData, country}) => {

    if (weatherData === null) {
        return null
    } else {

        return(
            <>
                <h2>Weather in {country.capital[0]}</h2>
                <p>temperature : {(weatherData.main.temp -  273.5).toFixed(2)}</p>
                <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}></img>
                <p>wind {weatherData.wind.speed} m/s</p>
            </>
        )

    }

   

}

export default Weather