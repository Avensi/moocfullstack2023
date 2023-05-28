import { useState } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const addPerson = (event) => {
    event.preventDefault()

    const Person = {
      name : newName,
      number : newNumber,
      id : persons.length + 1
    }
    
    if((persons.filter(person => person.name === Person.name).length !== 0)) {
      alert(`${newName} is already added to phonebook`)

    } else {
      setPersons(persons.concat(Person))
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