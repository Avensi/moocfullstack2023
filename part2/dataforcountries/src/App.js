import Filter from './Components/Filter.js';
import { useState, useEffect } from 'react';
import Countries from './Components/Countries.js'
import CountryService from './Services/CountryService.js'

const App = () => {
  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    CountryService
    .fetchCountries()
    .then(initialCountries => {
      setCountries(initialCountries)
    })
  }, [])

  const handleNewFilter = (event) => setNewFilter(event.target.value)

  return (
    <div>
      <Filter value={newFilter} onChange={handleNewFilter}/>
      <Countries countries={countries} filter={newFilter}/>
    </div>
  )
}

export default App;
