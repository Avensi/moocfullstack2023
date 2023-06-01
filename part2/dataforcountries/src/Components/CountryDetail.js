const CountryDetail = ({country}) => {

    const keys = Object.keys(country.languages)


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
        </>
    )
}

export default CountryDetail