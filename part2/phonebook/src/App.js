import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import PersonService from './services/PersonService'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')



  useEffect(() => {
    PersonService
    .fetchPersons()
    .then(initialPersons => setPersons(initialPersons))
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const Person = {
      name : newName,
      number : newNumber,
    }
    
    if((persons.filter(person => person.name === Person.name).length !== 0)) {
      alert(`${newName} is already added to phonebook`)

    } else {
      PersonService
      .createPerson(Person)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName("")
        setNewNumber("")
      })
    }
    
  }

  const erasePerson = (personID) => {
    PersonService
    .deletePerson(personID)
    setPersons(persons.filter(person => person.id !== personID))
  
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
      <Persons persons={personsToShow} erasePerson={erasePerson} />
    </div>
  )
}

export default App