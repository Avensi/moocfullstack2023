import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const fetchPersons = () => {
    axios
    .get("http://localhost:3001/persons")
    .then(response => {
      setPersons(response.data)
    })
  }

  useEffect(fetchPersons, [])

  const addPerson = (event) => {
    event.preventDefault()

    const Person = {
      name : newName,
      number : newNumber,
    }
    
    if((persons.filter(person => person.name === Person.name).length !== 0)) {
      alert(`${newName} is already added to phonebook`)

    } else {
      axios
      .post('http://localhost:3001/persons', Person)
      .then(response => {setPersons(persons.concat(response.data))})
    }
    
    setNewName("")
    setNewNumber("")
  }

  const personsToShow = persons.filter(person => person.name.toLocaleLowerCase().includes(newFilter.toLocaleLowerCase()))

  const handleNewName = (event) => setNewName(event.target.value)
  const handleNewNumber = (event) => setNewNumber(event.target.value)
  const handleNewFilter = (event) => setNewFilter(event.target.value)

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={newFilter} onChange={handleNewFilter} />
      <h3>Add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} handleNewName={handleNewName} handleNewNumber={handleNewNumber} />
      <h3>Numbers</h3>
      <Persons persons={personsToShow} />
    </div>
  )
}

export default App