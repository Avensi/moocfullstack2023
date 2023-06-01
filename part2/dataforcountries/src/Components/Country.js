import { useState } from "react"
import CountryDetail from "./CountryDetail"

const Country = ({country}) => {

    const [showDetail, setShowDetail] = useState(false)

    const handleShow = () => {
        setShowDetail(!showDetail)
    }

    return (
        <>
        <p>{country.name.common} <button onClick={handleShow}>{showDetail ? "hide" : "show"}</button></p>
        {showDetail ? <CountryDetail country={country}/> : null}
        </>
    )
}

export default Country