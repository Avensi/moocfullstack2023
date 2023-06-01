import Country from "./Country";
import CountryDetail
 from "./CountryDetail";
const Countries = ({countries, filter}) => {
    
    let filteredCountry = countries.filter(country => country.name.common.toLocaleLowerCase().includes(filter.toLocaleLowerCase()))
    
    if(filteredCountry.length <= 10 &filteredCountry.length !== 1){
            return(
            <>
            {filteredCountry.map(country => <Country key={country.ccn3} country={country}/>)}
            </>
        )
    }else if(filteredCountry.length === 1){
        return(
            <>
            <CountryDetail country={filteredCountry[0]}/>
            </>
        )
    }else {
        return("Too many countries to match, specify another filter")
    }
}

export default Countries