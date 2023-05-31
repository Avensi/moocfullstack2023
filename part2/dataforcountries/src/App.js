import Filter from './Components/Filter.js';
import { useState } from 'react';
import Country from './Components/Country.js';

const App = () => {

  const [newFilter, setNewFilter] = useState('')
  const [newCountries, setNewCountries] = useState([])

  const handleNewFilter = (event) => setNewFilter(event.target.value)
  return (
    <div>
      <Filter value={newFilter} onChange={handleNewFilter}/>
    </div>
  )
}

export default App;
